using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using System.Data;
using Dodo.CamundaClient;

namespace Dodo.Web.ApplicationHelpers
{
    public class Task
    {
        public Guid Id { get; set; }
        public Guid FileId { get; set; }
        public string Subject { get; set; }
        public string Type { get; set; }
        public string FormName { get; set; }
    }

    public static class TaskHelper
    {
        public static Task GetTaskById(Guid taskId)
        {
            using (var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                //Ignore user for now... 
                string stmt = @"SELECT id,entity_id, subject, task_type, action_type, user_id, status FROM dbo.tasks WHERE id=@id";
                connection.Open();
                try
                {
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", taskId);
                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return new Task
                                {
                                    Id = reader.GetGuid(0),
                                    FileId = reader.GetGuid(1),
                                    Subject = reader.GetString(2),
                                    Type = reader.GetString(3),
                                    FormName = reader.GetString(4)
                                };
                            }
                        }
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
            return null;
        }

        public static void CompleteTask(Guid taskId)
        {
            string wfId = null;
            using (var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                //Ignore user for now... 
                connection.Open();
                try
                {
                    string stmt1 = @"SELECT wf_task_id FROM dbo.tasks WHERE id=@id";
                    using (var cmd = new NpgsqlCommand(stmt1, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", taskId);
                        wfId = (string)cmd.ExecuteScalar();
                    }
                    string stmt2 = @"UPDATE dbo.tasks SET status='completed', complete_date=@dt1";
                    using(var cmd2 = new NpgsqlCommand(stmt2, connection))
                    {
                        cmd2.Parameters.AddWithValue("@dt1", DateTime.UtcNow);
                        cmd2.ExecuteNonQuery();
                    }
                }
                finally
                {
                    connection.Close();
                }

                if (wfId != null)
                {
                    var camunda = new CamundaEngineClient(new System.Uri(Startup.camundaUrl), null, null);
                    camunda.Startup();
                    try
                    {
                        camunda.HumanTaskService.Complete(wfId, new Dictionary<string, object>() {
                            {"completed", true }
                        });
                    }
                    finally
                    {
                        camunda.Shutdown();
                    }
                }

            }
        }

        public static List<Task> GetTasksForUser(string uid)
        {
            List<Task> results = new List<Task>();

            using (var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                //Ignore user for now... 
                string stmt = @"SELECT id,entity_id, subject, task_type, action_type, user_id, status FROM dbo.tasks WHERE status <> 'completed'";
                connection.Open();
                try
                {
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                results.Add(new Task
                                {
                                    Id = reader.GetGuid(0),
                                    FileId = reader.GetGuid(1),
                                    Subject = reader.GetString(2),
                                    Type = reader.GetString(3),
                                    FormName = reader.GetString(4)
                                });
                            }
                        }
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
            return results;
        }
    }
}
