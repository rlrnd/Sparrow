using System;
using System.Data;
using System.Data.Common;
using Npgsql;
using Microsoft.Extensions.Configuration;

using System.IO;

using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Dodo.Migration
{
    [TestClass]
    public class SetupInitialData
    {
        protected string _connectionString = string.Empty;

        [TestMethod]
        public void InitalizeData()
        {
            using(var connection = new NpgsqlConnection(_connectionString))
            {
                connection.Open();
                try
                {
                    Guid tenantId = CreateTenant(connection);
                    Guid unitId = CreateUnit(connection, tenantId);
                    Guid roleId = CreateRole(connection, tenantId);
                    Guid userId = CreateUser(connection, tenantId);
                    CreateAssignment(connection, userId, unitId, roleId, tenantId);
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        protected Guid CreateTenant( NpgsqlConnection connection )
        {
            Guid result;
            const string stmtSelectTenant = @"SELECT id FROM dbo.tenants";
            using (var cmd = new NpgsqlCommand(stmtSelectTenant, connection))
            {
                using( var reader = cmd.ExecuteReader())
                {
                    if(reader.Read())
                    {
                        result = reader.GetGuid(0);
                        reader.Close();
                        return result;
                    }
                }
            }
            result = Guid.NewGuid();
            Guid clientId = Guid.NewGuid();
            const string stmtInsertTenant = @"INSERT INTO dbo.tenants(id, client_id, name) VALUES ( @tid, @cid, 'general hospital 1');";
            using (var cmd = new NpgsqlCommand(stmtInsertTenant, connection))
            {
                cmd.Parameters.AddWithValue("@tid", result);
                cmd.Parameters.AddWithValue("@cid", clientId);
                cmd.ExecuteNonQuery();
            }
            return result;
        }

        protected Guid CreateUnit(NpgsqlConnection connection, Guid tenantId)
        {
            Guid result;
            const string stmtSelectTenant = @"SELECT id FROM dbo.units WHERE tenant_id=@tid";
            using (var cmd = new NpgsqlCommand(stmtSelectTenant, connection))
            {
                cmd.Parameters.AddWithValue("@tid", tenantId);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = reader.GetGuid(0);
                        reader.Close();
                        return result;
                    }
                }
            }
            result = Guid.NewGuid();
            const string stmtInsertTenant = @"INSERT INTO dbo.units(id, tenant_id, parent_id, path, name) VALUES ( @id, @tid, null, 'Site1', 'Site1')";
            using (var cmd = new NpgsqlCommand(stmtInsertTenant, connection))
            {
                cmd.Parameters.AddWithValue("@id", result);
                cmd.Parameters.AddWithValue("@tid", tenantId);
                cmd.ExecuteNonQuery();
            }
            return result;
        }

        protected Guid CreateRole(NpgsqlConnection connection, Guid tenantId)
        {
            Guid result;
            const string stmtSelectTenant = @"SELECT id FROM dbo.roles WHERE tenant_id=@tid";
            using (var cmd = new NpgsqlCommand(stmtSelectTenant, connection))
            {
                cmd.Parameters.AddWithValue("@tid", tenantId);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = reader.GetGuid(0);
                        reader.Close();
                        return result;
                    }
                }
            }
            result = Guid.NewGuid();
            const string stmtInsertTenant = @"INSERT INTO dbo.roles(id, tenant_id, name, permanant, description) VALUES (@id, @tid, 'Role1', true, 'testRole')";
            using (var cmd = new NpgsqlCommand(stmtInsertTenant, connection))
            {
                cmd.Parameters.AddWithValue("@id", result);
                cmd.Parameters.AddWithValue("@tid", tenantId);
                cmd.ExecuteNonQuery();
            }
            return result;
        }

        protected Guid CreateUser(NpgsqlConnection connection, Guid tenantId)
        {
            Guid result;
            const string stmtSelectTenant = @"SELECT id FROM dbo.users WHERE tenant_id=@tid";
            using (var cmd = new NpgsqlCommand(stmtSelectTenant, connection))
            {
                cmd.Parameters.AddWithValue("@tid", tenantId);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = reader.GetGuid(0);
                        reader.Close();
                        return result;
                    }
                }
            }
            result = Guid.NewGuid();
            const string stmtInsertTenant = @"INSERT INTO dbo.users(id, name, email, status, tenant_id)	VALUES ( @id, 'Jian', 'jchonc@gmail.com', 'active', @tid)";
            using (var cmd = new NpgsqlCommand(stmtInsertTenant, connection))
            {
                cmd.Parameters.AddWithValue("@id", result);
                cmd.Parameters.AddWithValue("@tid", tenantId);
                cmd.ExecuteNonQuery();
            }
            return result;
        }

        protected Guid CreateAssignment(NpgsqlConnection connection, Guid userId, Guid unitId, Guid roleId, Guid tenantId)
        {
            Guid result;
            const string stmtSelectTenant = @"SELECT id FROM dbo.assignments WHERE user_id=@uid";
            using (var cmd = new NpgsqlCommand(stmtSelectTenant, connection))
            {
                cmd.Parameters.AddWithValue("@uid", userId);
                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result = reader.GetGuid(0);
                        reader.Close();
                        return result;
                    }
                }
            }
            result = Guid.NewGuid();
            const string stmtInsertTenant = @"INSERT INTO dbo.assignments(id, tenant_id, user_id, unit_id, role_id)	VALUES (@id, @tid, @userid, @unitid, @rid);";
            using (var cmd = new NpgsqlCommand(stmtInsertTenant, connection))
            {
                cmd.Parameters.AddWithValue("@id", result);
                cmd.Parameters.AddWithValue("@tid", tenantId);
                cmd.Parameters.AddWithValue("@userid", userId);
                cmd.Parameters.AddWithValue("@unitid", unitId);
                cmd.Parameters.AddWithValue("@rid", roleId);
                cmd.ExecuteNonQuery();
            }
            return result;
        }


        [TestInitialize]
        public void Setup()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appSettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();

            _connectionString = configuration.GetSection("database").Value;
        }

        
    }
}
