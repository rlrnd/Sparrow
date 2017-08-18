using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
using System.Xml;

using CamundaClient;
using CamundaClient.Dto;

namespace WorkflowCompanion
{
    class Program
    {
        public static XmlDocument CachedDoc = null;
        public static XmlNamespaceManager CachedDocNsManager = null;

        public static Dictionary<string,string> GetTaskVariables(string taskType, string activityId)
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

        static void Main(string[] args)
        {
            const string ruleName = "testRule";
            var fileName = Directory.GetCurrentDirectory() + "\\" + "testRule.bpmn";
            byte[] ruleContent = System.IO.File.ReadAllBytes(fileName);
            

            var camunda = new CamundaEngineClient(new System.Uri("http://localhost:8080/engine-rest/engine/default/"), null, null);
            camunda.Startup();
            string deploymentId = camunda.RepositoryService.Deploy(ruleName, new List<object> { new FileParameter(ruleContent, fileName) });
            CachedDoc = new XmlDocument();
            CachedDoc.Load(fileName);
            CachedDocNsManager = new XmlNamespaceManager(CachedDoc.NameTable);
            CachedDocNsManager.AddNamespace("bpmn2", "http://www.omg.org/spec/BPMN/20100524/MODEL");
            CachedDocNsManager.AddNamespace("camunda", "http://camunda.org/schema/1.0/bpmn");

            var fakeFile = new Dictionary<string,object>
            {
                { "fileId", 1 },
                { "tenantId", 123 },
                { "locationId", "aaabbbccc" },
                { "type", "Fall" },
                { "severity", "Injure" },
                { "submittedBy", "a@b.com" },
                { "details", new Dictionary<string,object> {
                    { "patient", "Smith" },
                    { "age", 17 },
                    { "gender", "Male" }
                }}
            };

            string processInstanceId = camunda.BpmnWorkflowService.StartProcessInstance(ruleName, fakeFile);

            DateTime lastCheck = DateTime.Now.AddDays(-1);
            while (!(Console.KeyAvailable && Console.ReadKey(true).Key == ConsoleKey.Escape))
            {
                var tasks = camunda.HumanTaskService.LoadTasks(new Dictionary<string, string>() {
                    { "createdAfter", lastCheck.ToString("yyyy-MM-ddTHH:mm:ss") },
                    { "processDefinitionName", "Incident" }
                });
                lastCheck = DateTime.Now;
                if (tasks != null && tasks.Count() != 0)
                {
                    Console.WriteLine("Human task detected");
                    foreach( var task in tasks)
                    {
                        var vs = camunda.HumanTaskService.LoadVariables(task.Id);
                        var ps = Program.GetTaskVariables("userTask", task.TaskDefinitionKey);

                        //these tasks need to be created in database

                    }
                }
                System.Threading.Thread.Sleep(5000);
            }
            
            camunda.Shutdown(); // Stop Task Workers

        }
    }
}
