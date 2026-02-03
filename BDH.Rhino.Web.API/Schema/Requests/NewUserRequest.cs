using BDH.Rhino.Web.API.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class NewUserRequest
    {
        [Required]
        [EmailAddress]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Display(Name = "Beheerder")]
        public bool IsAdmin { get; set; }

        public string Company { get; set; } = null!;


        public NewUserRequest()
        {
            Email = string.Empty;
        }

        public User ToUser(Company company)
        {
            return new User()
            {
                EmailAdress = Email,
                IsAdmin = IsAdmin,
                Company = company,
            };
        }
    }
}
