using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class EditUserRequest
    {
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Display(Name = "Beheerder")]
        public bool IsAdmin { get; set; }

        public string Company { get; set; } = string.Empty;

        public EditUserRequest()
        {
            Email = string.Empty;
        }
    }
}
