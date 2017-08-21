using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Dodo.CamundaClient;
using Dodo.CamundaClient.Dto;

namespace Dodo.CamundaClient.Requests
{
    public class LoggingHandler : DelegatingHandler
    {
        public LoggingHandler(HttpMessageHandler innerHandler) : base(innerHandler)
        {
        }

        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Console.WriteLine("Request:");
            Console.WriteLine(request.ToString());
            if (request.Content != null)
            {
                string re = await request.Content.ReadAsStringAsync();
                Console.WriteLine(re);
            }
            Console.WriteLine();

            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

            Console.WriteLine("Response:");
            Console.WriteLine(response.ToString());
            if (response.Content != null)
            {
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
            Console.WriteLine();

            return response;
        }
    }

    /*
    * Basis taken from http://www.briangrinstead.com/blog/multipart-form-post-in-c
    */
    public static class FormUpload
    {
        private static readonly Encoding encoding = Encoding.UTF8;

        public static HttpResponseMessage MultipartFormDataPost(string postUrl, string username, string password, Dictionary<string, object> postParameters)
        {
            using (var client = new HttpClient(new LoggingHandler(new HttpClientHandler())))
            {
                var content = new MultipartFormDataContent();
                foreach (KeyValuePair<string, object> kvp in postParameters)
                {
                    if (kvp.Value is List<object>)
                    {
                        List<object> lists = (List<object>)kvp.Value;
                        if (lists.Count > 0)
                        {
                            foreach (var f in lists)
                            {
                                var fp = (FileParameter)f;
                                var byteArrayContent = new ByteArrayContent(fp.File);
                                var header = new System.Net.Http.Headers.ContentDispositionHeaderValue("form-data");
                                header.Name = fp.FileName;
                                header.FileName = fp.FileName;
                                header.FileNameStar = null;
                                byteArrayContent.Headers.ContentDisposition = header;
                                byteArrayContent.Headers.Add("Content-Type", "application/octet-stream");
                                content.Add(byteArrayContent);
                            }
                        }
                    }
                    else
                    {
                        var sc = new StringContent((string)kvp.Value);
                        sc.Headers.Clear();
                        content.Add(sc, @"""" + kvp.Key + @"""");
                    }
                }
                if (!string.IsNullOrEmpty(username))
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(username + ":" + password)));
                }
                return client.PostAsync(postUrl, content).Result;
            }
        }


    }
}
