using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dodo.Web.Controllers
{
    public class TasksController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/users/{uid}/tasks")]
        public IActionResult TaskByUser(string uid)
        {
            ViewData["uid"] = uid;
            return View(ApplicationHelpers.TaskHelper.GetTasksForUser(uid));
        }
    }
}