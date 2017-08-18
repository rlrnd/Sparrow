using System;
using System.Collections.Generic;
using System.Text;
using Dodo.CamundaClient.Dto;
using Dodo.CamundaClient.Worker;

namespace Dodo.CamundaCompanion.Workers
{
    [ExternalTaskTopic("appNotification")]
    [ExternalTaskVariableRequirements("name", "subject", "content", "email")]
    public class NotificationAdapter : IExternalTaskAdapter
    {
        public void Execute(ExternalTask externalTask, ref Dictionary<string, object> resultVariables)
        {
            // Put breakpoint here, email or popup?
        }
    }
}
