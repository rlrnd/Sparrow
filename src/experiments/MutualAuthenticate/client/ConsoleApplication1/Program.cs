using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            //openssl pkcs12 -inkey client1-key.pem -in client1-crt.pem -export -out client1.pfx -passin 'pass:password'

            X509Certificate2Collection certificates = new X509Certificate2Collection();
            certificates.Import("client1.pfx");
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://192.168.23.131:4433");
            request.ClientCertificates = certificates;
            request.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) =>
            {
                return true;
            };
            request.Method = "GET";
            WebResponse response = request.GetResponse();
            var encoding = ASCIIEncoding.ASCII;
            using (var reader = new System.IO.StreamReader(response.GetResponseStream(), encoding))
            {
                Console.WriteLine(reader.ReadToEnd());
            }
            Console.ReadKey();
        }
    }
}
