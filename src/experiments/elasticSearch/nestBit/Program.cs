using Nest;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Newtonsoft.Json;

namespace nestBit
{
    class Program
    {
        public static IConfigurationRoot Configuration { get; set; }



        private static ElasticClient Client { get; set; }

        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appSettings.json");

            Configuration = builder.Build();

            string url = Configuration["elasticSearch:url"];
            string elasticSearchIndex = Configuration["elasticSearch:index"];
            string userName = Configuration["elasticSearch:userName"];
            string password = Configuration["elasticSearch:password"];
            // add some files
            // add some patients 
            // put some stuff in it.
            // crud
            // simple search
            // full text search 
            // isolation by tenantId
            var node = new Uri(url);
            var settings = new ConnectionSettings(node);
            settings.BasicAuthentication(userName, password);

            var client = new ElasticClient(settings);

            var patient = new Patient
            {
                Id = 1,
                FirstName = "Mark",
                LastName = "Zuckerberg",
                AlternateIdentifiers = new List<AlternateIdentifier> { new AlternateIdentifier()
                    {
                        Code= "MRN",
                        Value="123-456-MMNNNRR"
                    }
                }
            };
            var response = client.Index(patient, idx => idx.Index(elasticSearchIndex));
            Console.WriteLine(JsonConvert.SerializeObject(response));

            var patientResult = client.Get<Patient>(response.Id, idx => idx.Index(elasticSearchIndex));
            Console.WriteLine(JsonConvert.SerializeObject(patientResult));


            Console.ReadKey(false);
        }


    }

    internal class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<AlternateIdentifier> AlternateIdentifiers { get; set; }
    }

    internal class AlternateIdentifier
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
    }
}