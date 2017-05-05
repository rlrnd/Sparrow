using System.ComponentModel.DataAnnotations;

namespace sparrow.securityServer.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
