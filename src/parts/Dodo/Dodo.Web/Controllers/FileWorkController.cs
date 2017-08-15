using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dodo.Web.Controllers
{
    public class FileWorkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/files/{fileId}/tasks/{taskId}")]
        public IActionResult Task(int fileId, int taskId)
        {
            ViewData["data"] = new {
                fileId = fileId,
                taskId = taskId
            };
            return View();
        }
    }
}