﻿using Dodo.CamundaClient.Dto;
using Dodo.CamundaClient.Service;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Dodo.CamundaClient.Worker
{
    class ExternalTaskWorker : IDisposable
    {
        private string workerId = Guid.NewGuid().ToString(); // TODO: Make configurable

        private Timer taskQueryTimer;
        private long pollingIntervalInMilliseconds = 1 * 1000; // every second
        private int maxDegreeOfParallelism = 2;
        private int maxTasksToFetchAtOnce = 10;
        private long lockDurationInMilliseconds = 1 * 60 * 1000; // 1 minute
        private ExternalTaskService externalTaskService;
        private ExternalTaskWorkerInfo taskWorkerInfo;

        public ExternalTaskWorker(ExternalTaskService externalTaskService, ExternalTaskWorkerInfo taskWorkerInfo)
        {
            this.externalTaskService = externalTaskService;
            this.taskWorkerInfo = taskWorkerInfo;
        }

        public void DoPolling()
        {
            // Query External Tasks
            try {
                var tasks = externalTaskService.FetchAndLockTasks(workerId, maxTasksToFetchAtOnce, taskWorkerInfo.TopicName, lockDurationInMilliseconds, new List<string>(taskWorkerInfo.VariablesToFetch));

                // run them in parallel with a max degree of parallelism
                Parallel.ForEach(
                    tasks,
                    new ParallelOptions { MaxDegreeOfParallelism = this.maxDegreeOfParallelism },
                    externalTask => Execute(externalTask)
                );
            }
            catch (EngineException ex)
            {
                // Most probably server is not running or request is invalid
                Console.WriteLine(ex.Message);
            }

            // schedule next run
            taskQueryTimer.Change((int)pollingIntervalInMilliseconds, Timeout.Infinite);
        }

        private void Execute(ExternalTask externalTask)
        {
            Dictionary<string, object> resultVariables = new Dictionary<string, object>();

            Console.WriteLine($"Execute External Task from topic '{taskWorkerInfo.TopicName}': {externalTask}...");
            try
            {
                taskWorkerInfo.TaskAdapter.Execute(externalTask, ref resultVariables);
                Console.WriteLine($"...finished External Task {externalTask.Id}");
                externalTaskService.Complete(workerId, externalTask.Id, resultVariables);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"...failed External Task  {externalTask.Id}");
                var retriesLeft = taskWorkerInfo.Retries; // start with default
                if (externalTask.Retries.HasValue) // or decrement if retries are already set
                {
                    retriesLeft = externalTask.Retries.Value - 1;
                }
                externalTaskService.Failure(workerId, externalTask.Id, ex.Message, retriesLeft, taskWorkerInfo.RetryTimeout);
            }
        }

        public void StartWork()
        {
            this.taskQueryTimer = new Timer(_ => DoPolling(), null, (int)pollingIntervalInMilliseconds, Timeout.Infinite);
        }

        public void StopWork()
        {
            this.taskQueryTimer.Dispose();
        }

        public void Dispose()
        {
            if (this.taskQueryTimer !=null)
            {
                this.taskQueryTimer.Dispose();
            }
        }
    }
}
