using System;
using System.Collections.Generic;
using System.Text;
using Dodo.CamundaClient.Dto;
using Dodo.CamundaClient.Worker;

namespace Dodo.CamundaCompanion.Workers
{
    [ExternalTaskTopic("dodoNotify")]
    [ExternalTaskVariableRequirements("fileId", "details", "submittedBy")]
    public class NotificationAdapter : IExternalTaskAdapter
    {
        public void Execute(ExternalTask externalTask, ref Dictionary<string, object> resultVariables)
        {
            var tp = Program.GetTaskVariables("sendTask", "Task_1yekdgs");
            Console.WriteLine("notifying");
            // Put breakpoint here, email or popup?
        }
    }
}
