using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dodo.Web.Controllers
{
    public class NewFileController : Controller
    {
        [Route("/iconwall")]
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// both new file and resume will be here.
        /// </summary>
        /// <param name="formName"></param>
        /// <param name="fileId"></param>
        /// <returns></returns>
        [Route("/files/new/{formName}/{fileId}")]
        public IActionResult NewFile(string formName, int? fileId)
        {
            return View();
        }
    }
}