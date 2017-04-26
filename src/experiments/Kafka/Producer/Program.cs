using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Confluent.Kafka.Serialization;

namespace Producer
{
    class Program
    {
        public static IConfigurationRoot Configuration { get; set; }

        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appSettings.json");

            Configuration = builder.Build();

            var brokerList = Configuration.GetSection("brokers").GetChildren().Select(x => x.Value).ToArray();

            var config = new Dictionary<string, object>
            {
                { "bootstrap.servers", String.Join(" ", brokerList) }
            };

            using (var producer = new Confluent.Kafka.Producer<Confluent.Kafka.Null, string>(config, null, new StringSerializer(Encoding.UTF8)))
            {
                var producerName = Configuration["producerName"];
                var topicName = Configuration["topicName"];

                Console.WriteLine("\n---------------------------------------------");
                Console.WriteLine($"Producer {producerName} producing on topic {topicName}.");
                Console.WriteLine("I will randomly create some messages until you hit <Ctrl-C>");
                Console.WriteLine("\n---------------------------------------------");

                var cancelled = false;
                Console.CancelKeyPress += (_, e) =>
                {
                    e.Cancel = true; // prevent the process from terminating.
                    cancelled = true;
                };

                while (!cancelled)
                {
                    System.Threading.Thread.Sleep(1000);
                    var message = "Something happened at " + DateTime.Now.ToString();
                    var deliveryReport = producer.ProduceAsync(topicName, null, message);
                    deliveryReport.ContinueWith(task =>
                    {
                        Console.WriteLine($"Partition: {task.Result.Partition}, Offset: {task.Result.Offset}");
                    });
                }

                Console.WriteLine("\nOver\n");
            }

            Console.WriteLine("Hello World!");
        }
    }
}