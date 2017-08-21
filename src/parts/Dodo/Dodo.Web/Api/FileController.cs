using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Dynamic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json;
using Npgsql;
using Dodo.CamundaClient;

namespace Dodo.Web.Api
{
    public class FileController : Controller
    {

        [HttpPost]
        [Route("/api/files/new")]
        public object createNewFile( [FromBody] Dictionary<string,object> file )
        {
            var o = (Newtonsoft.Json.Linq.JObject )file["file"];
            dynamic od = (dynamic)o;
            // Save it to Postgresql
            using (var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                const string stmt = @"INSERT INTO dbo.incidents(id, tenant_id, patient_id, unit_id, type, severity, state, details, created_by, created_on, last_modified_by, last_modified_on)
	                VALUES (@id, @tenant_id, @patient_id, @unit_id, @type, @severity, @state, @details, @cb, @co, @mb, @mo);";
                connection.Open();
                try
                {
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", Guid.NewGuid());
                        cmd.Parameters.AddWithValue("@tenant_id", Guid.Parse((string)od.tenantId.Value));
                        cmd.Parameters.AddWithValue("@patient_id", DBNull.Value);
                        cmd.Parameters.AddWithValue("@unit_id", Guid.Parse((string)od.unitId.Value));
                        cmd.Parameters.AddWithValue("@type", (string)od.type.Value);
                        cmd.Parameters.AddWithValue("@severity", (string)od.severity.Value);
                        cmd.Parameters.AddWithValue("@state", "new");
                        cmd.Parameters.AddWithValue("@details", od.details.ToString()).NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Jsonb;
                        cmd.Parameters.AddWithValue("@cb", (string)od.submittedBy.Value);
                        cmd.Parameters.AddWithValue("@co", DateTime.Now);
                        cmd.Parameters.AddWithValue("@mb", (string)od.submittedBy.Value);
                        cmd.Parameters.AddWithValue("@mo", DateTime.Now);
                        cmd.ExecuteNonQuery();
                    }
                }
                finally
                {
                    connection.Close();
                }
            }

            // Post it to Camunda
            var camunda = new CamundaEngineClient(new System.Uri(Startup.camundaUrl), null, null);
            camunda.Startup();
            try
            {
                var ft = o.ToObject<Dictionary<string, object>>();
                string processInstanceId = camunda.BpmnWorkflowService.StartProcessInstance("dodoAppRule", ft);
            }
            finally
            {
                camunda.Shutdown();
            }
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }
    }
}