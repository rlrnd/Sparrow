using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using System.Data;
using System.Data.Common;
using Microsoft.Extensions.Configuration;
using Dodo.CamundaClient;
using Dodo.CamundaClient.Dto;

namespace Dodo.Web.ApplicationHelpers
{
    
    public class WorkflowHelper
    {
        public static string GetWorkflow()
        {
            string connectionString = Startup.databaseConnection;
            using(var connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
                try
                {
                    const string stmt = @"SELECT bpmn_details FROM dbo.workflows WHERE entity='Incident'";
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                return reader.GetString(0);
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

        public static void PublishWorkflow(string bpmn)
        {
            bpmn = bpmn.Trim();
            string connectionString = Startup.databaseConnection;
            using (var connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();
                try
                {
                    Guid id = Guid.Empty;
                    const string stmt = @"SELECT id FROM dbo.workflows WHERE entity='Incident'";
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        using (var reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                id = reader.GetGuid(0);
                            }
                        }
                    }
                    if (id == Guid.Empty)
                    {
                        string stmtInsert = @"INSERT INTO dbo.workflows( id, tenant_id, entity, process_id, bpmn_details, created_by, created_on, last_modified_by, last_modified_on)
                                            VALUES(@id, @tid, 'Incident', null, @bpmn, 'Jian', current_timestamp, 'Jian', current_timestamp)";
                        using (var cmd = new NpgsqlCommand(stmtInsert, connection))
                        {
                            cmd.Parameters.AddWithValue("@id", Guid.NewGuid());
                            cmd.Parameters.AddWithValue("@tid", Guid.Parse("fef554a9-e234-4177-8dac-0680702d4ec7"));
                            var p = cmd.Parameters.AddWithValue("@bpmn", bpmn);
                            p.DbType = DbType.Xml;
                            cmd.ExecuteNonQuery();
                        }
                    }
                    else
                    {
                        string stmtUpdate = @"UPDATE dbo.workflows set bpmn_details = @bpmn WHERE id = @id";
                        using (var cmd = new NpgsqlCommand(stmtUpdate, connection))
                        {
                            cmd.Parameters.AddWithValue("@id", id);
                            var p = cmd.Parameters.AddWithValue("@bpmn", bpmn);
                            p.DbType = DbType.Xml;
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                finally
                {
                    connection.Close();
                }
            }

            string camundaUrl = Startup.camundaUrl;
            var camunda = new CamundaEngineClient(new System.Uri(camundaUrl), null, null);
            camunda.Startup();
            try
            {
                string deploymentId = camunda.RepositoryService.Deploy("DodoAppRule", new List<object> { new FileParameter(System.Text.Encoding.UTF8.GetBytes(bpmn), "DodoAppRule.bpmn") });
            }
            finally
            {
                camunda.Shutdown();
            }

        }
    }
}
