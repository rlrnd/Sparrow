using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dodo.Web.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("/admin/configure")]
        public IActionResult Configure()
        {
            return View();
        }

        [Route("/admin/configure/iconwall")]
        public IActionResult ConfigureIconWall()
        {
            return View();
        }

    }
}