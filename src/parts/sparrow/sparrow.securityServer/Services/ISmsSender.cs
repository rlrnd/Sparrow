using System.Threading.Tasks;

namespace sparrow.securityServer.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
