using Dodo.CamundaClient.Dto;
using System.Collections.Generic;

namespace Dodo.CamundaClient.Worker
{

    public interface IExternalTaskAdapter
    {
        void Execute(ExternalTask externalTask, ref Dictionary<string, object> resultVariables);
    }


}
