using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dodo.Web.ApplicationHelpers
{
    public class Task
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public string Subject { get; set; }
    }

    public static class TaskHelper
    {
        public static List<Task> GetTasksForUser(string uid)
        {
            List<Task> results = new List<Task>();
            results.Add(new Task { Id = 1, FileId=2, Subject = "abcd" });

            return results;
        }

    }
}
