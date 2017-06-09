using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net;
using CamundaClient.Dto;
using CamundaClient.Worker;

namespace WorkflowCompanion.Worker
{
    [ExternalTaskTopic("notifyPerson")]
    [ExternalTaskVariableRequirements("fileId", "tenantId", "locationId")]
    class NotifyAdapter : IExternalTaskAdapter
    {
        public void Execute(ExternalTask externalTask, ref Dictionary<string, object> resultVariables)
        {
            var variables = Program.GetTaskVariables("sendTask", externalTask.ActivityId);
            Console.WriteLine("Notify " + variables["roleName"]);
        }
    }
}
