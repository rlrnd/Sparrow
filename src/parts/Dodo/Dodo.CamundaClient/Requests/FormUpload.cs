using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Dodo.CamundaClient;
using Dodo.CamundaClient.Dto;

namespace Dodo.CamundaClient.Requests
{


    /*
    * Basis taken from http://www.briangrinstead.com/blog/multipart-form-post-in-c
    */
    public static class FormUpload
    {
        private static readonly Encoding encoding = Encoding.UTF8;

        public static HttpResponseMessage MultipartFormDataPost(string postUrl, string username, string password, Dictionary<string, object> postParameters)
        {
            using (var client = new HttpClient())
            {
                var content = new MultipartFormDataContent();
                foreach(KeyValuePair<string,object> kvp in postParameters)
                {
                    if(kvp.Value is List<object>)
                    {
                        List<object> lists = (List<object>)kvp.Value;
                        if(lists.Count > 0 )
                        {
                            object f1 = lists[0];
                            if(f1 is FileParameter)
                            {
                                FileParameter fp = (FileParameter)f1;
                                content.Add(new ByteArrayContent(fp.File), "data", fp.FileName);
                            }
                        }
                    }
                    else
                    {
                        content.Add(new StringContent((string)kvp.Value), kvp.Key);
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
