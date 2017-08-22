using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dodo.Web.Controllers
{
    public class FileTaskModel
    {
        public ApplicationHelpers.Task Task {get;set;}
        public System.Dynamic.ExpandoObject File { get; set; }
    }

    public class FileWorkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/files/{fileId}/tasks/{taskId}")]
        public IActionResult Task(Guid fileId, Guid taskId)
        {
            var task = ApplicationHelpers.TaskHelper.GetTaskById(taskId);
            var file = ApplicationHelpers.FileHelper.GetFileById(fileId);
            ViewData["fileId"] = fileId;
            ViewData["taskId"] = taskId;
            return View(new FileTaskModel { File = file, Task = task } );
        }
    }
}