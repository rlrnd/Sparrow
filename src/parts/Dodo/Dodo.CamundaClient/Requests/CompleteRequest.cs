﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dodo.CamundaClient.Dto;

namespace Dodo.CamundaClient.Requests
{
    class CompleteRequest
    {
        public string BusinessKey { get; set; }
        public Dictionary<string, Variable> Variables { get; set; }
        public string WorkerId { get; set; }
    }
}
