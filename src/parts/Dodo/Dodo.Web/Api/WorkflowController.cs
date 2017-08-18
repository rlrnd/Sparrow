using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;

namespace Dodo.Web.Api
{
    public class WorkflowRec
    {
        public string Content { get; set; }
    }

    public class WorkflowController : Controller
    {
        [Route("/api/workflow/1")]
        public object GetWorkflow()
        {
            string xml = ApplicationHelpers.WorkflowHelper.GetWorkflow();
            if(string.IsNullOrEmpty(xml))
            {
                return "NULL";
            }
            else
            {
                return new WorkflowRec { Content = xml };
            }
        }

        [HttpPost]
        [Route("/api/workflow/1")]
        public object PutWorkflow([FromBody]WorkflowRec rec)
        {
            string bpmn = rec.Content;
            ApplicationHelpers.WorkflowHelper.PublishWorkflow(bpmn);
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }
    }
}