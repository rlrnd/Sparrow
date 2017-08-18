using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using Dodo.CamundaClient;
using System.Data;
using System.Data.Common;
using Npgsql;
using System.Xml;

namespace Dodo.CamundaCompanion
{
    class Program
    {
        protected static string connectionString = null;
        protected static string camundaUrl = null;

        public static string processId = null;
        public static XmlDocument CachedDoc = null;
        public static XmlNamespaceManager CachedDocNsManager = null;

        public static Dictionary<string, string> GetTaskVariables(string taskType, string activityId)
        {
            Dictionary<string, string> results = new Dictionary<string, string>();
            if (CachedDoc != null && (!string.IsNullOrEmpty(taskType)) && (!string.IsNullOrEmpty(activityId)))
            {
                var query = "//bpmn2:" + taskType + "[@id='" + activityId + "']";
                XmlNode taskNode = CachedDoc.SelectSingleNode(query, CachedDocNsManager);
                if (taskNode != null)
                {
                    foreach (XmlNode f in taskNode.SelectNodes("bpmn2:extensionElements/camunda:field", CachedDocNsManager))
                    {
                        string name = f.Attributes["name"].Value;
                        string value = "";
                        XmlNode vNode = f.SelectSingleNode("camunda:string", CachedDocNsManager);
                        if (vNode != null)
                        {
                            value = vNode.InnerText;
                        }
                        results.Add(name, value);
                    }
                }
            }
            return results;
        }

        protected static bool FetchBPMN()
        {
            using(var connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
                try
                {
                    const string stmt = @"SELECT process_id, bpmn_details FROM dbo.workflows WHERE tenant_id='first-tenant'";
                    using(var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        using(var reader = cmd.ExecuteReader())
                        {
                            if(reader.Read())
                            {
                                processId = reader.GetString(0);
                                var doc = reader.GetString(1);
                                CachedDoc = new XmlDocument();
                                CachedDoc.LoadXml(doc);
                                CachedDocNsManager = new XmlNamespaceManager(CachedDoc.NameTable);
                                CachedDocNsManager.AddNamespace("bpmn2", "http://www.omg.org/spec/BPMN/20100524/MODEL");
                                CachedDocNsManager.AddNamespace("camunda", "http://camunda.org/schema/1.0/bpmn");
                                reader.Close();
                                return true;
                            }
                            else
                            {
                                return false;
                            }
                        }
                    }
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                           .SetBasePath(Directory.GetCurrentDirectory())
                           .AddJsonFile("appSettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();

            connectionString = configuration.GetSection("database").Value;
            camundaUrl = configuration.GetSection("camunda").Value;

            if(FetchBPMN())
            {
                Console.WriteLine("workflow found");
                var camunda = new CamundaEngineClient(new System.Uri(camundaUrl), null, null);
                camunda.Startup();
                try
                {
                    DateTime lastCheck = DateTime.Now.AddDays(-1);
                    while (!(Console.KeyAvailable && Console.ReadKey(true).Key == ConsoleKey.Escape))
                    {
                        var tasks = camunda.HumanTaskService.LoadTasks(new Dictionary<string, string>() {
                            { "createdAfter", lastCheck.ToString("yyyy-MM-ddTHH:mm:ss") },
                            { "processDefinitionName", "Incident" }
                        });
                        lastCheck = DateTime.Now;
                        if (tasks != null && tasks.Count != 0)
                        {
                            Console.WriteLine("Human task detected");
                            using (var connection = new NpgsqlConnection(connectionString))
                            {
                                const string stmtInsertTask = @"INSERT INTO dbo.tasks(id, user_id, wf_task_id, task_type, status, created_by, due_date, complete_date, subject, entity, entity_id, action_type, details)
	                                VALUES ( @id, @uid, @wf_task_id, @type, 'assigned', 'workflow', @due_date, null, @subject, 'incident', @file_id, @action_type, @details);";
                                connection.Open();
                                try
                                {
                                    using (var cmd = new NpgsqlCommand(stmtInsertTask, connection))
                                    {
                                        foreach (var task in tasks)
                                        {
                                            var vs = camunda.HumanTaskService.LoadVariables(task.Id);
                                            var ps = Program.GetTaskVariables("userTask", task.TaskDefinitionKey);

                                            //Guid uid =  FindUserByParams(vs, ps);

                                            cmd.Parameters.Clear();
                                            cmd.Parameters.AddWithValue("@id", Guid.NewGuid());
                                            //cmd.Parameters.AddWithValue("@uid", uid);
                                            cmd.Parameters.AddWithValue("@wf_task_id", task.Id);

                                            cmd.ExecuteNonQuery();
                                            // Some log?
                                        }
                                    }
                                }
                                finally
                                {
                                    connection.Close();
                                }
                            }
                        }

                    }
                }
                finally
                {
                    camunda.Shutdown();
                }
            }
            else
            {
                Console.WriteLine("No workflow found");
            }
        }
    }
}
