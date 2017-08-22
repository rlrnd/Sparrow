using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using System.Dynamic;

namespace Dodo.Web.ApplicationHelpers
{

    public static class FileHelper
    {
        public static ExpandoObject GetFileById(Guid fileId)
        {
            using(var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                string stmt = @"SELECT id, tenant_id, patient_id, unit_id, type, severity, state, details, created_by, created_on, last_modified_by, last_modified_on FROM dbo.incidents WHERE id=@id";
                connection.Open();
                try
                {
                    using (var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", fileId);
                        using(var reader = cmd.ExecuteReader())
                        {
                            if(reader.Read())
                            {
                                dynamic result = new ExpandoObject();
                                result.Id = reader.GetGuid(0);
                                result.UnitId = reader.GetGuid(3);
                                result.IncidentType = reader.GetString(4);
                                result.Severity = reader.GetString(5);
                                result.State = reader.GetString(6);
                                result.Details = reader.GetString(7); //IRL might need to deserialize it.
                                return result;
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

        public static void AppendFileFollowup(Guid fileId, Guid taskId, string followupType, dynamic activity )
        {
            const string stmt = @"INSERT INTO dbo.followups(
                id, tenant_id, task_id, entity, entity_id, action_type, created_by, created_on, last_modified_by, last_modified_on, details)
                VALUES( @id, @tenant_id, @task_id, 'Incident', @file_id, @action_type, 'jian', @dt1, 'jian', @dt2, @details)";

            using (var connection = new NpgsqlConnection(Startup.databaseConnection))
            {
                connection.Open();
                try
                {
                    using( var cmd = new NpgsqlCommand(stmt, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", Guid.NewGuid());
                        cmd.Parameters.AddWithValue("@tenant_id", DBNull.Value);
                        cmd.Parameters.AddWithValue("@task_id", taskId);
                        cmd.Parameters.AddWithValue("@file_id", fileId);
                        cmd.Parameters.AddWithValue("@action_type", followupType);
                        cmd.Parameters.AddWithValue("@dt1", DateTime.UtcNow);
                        cmd.Parameters.AddWithValue("@dt2", DateTime.UtcNow);
                        cmd.Parameters.AddWithValue("@details", activity).NpgsqlDbType = NpgsqlTypes.NpgsqlDbType.Jsonb;
                        cmd.ExecuteNonQuery();
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
