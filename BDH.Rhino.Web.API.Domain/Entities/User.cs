using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class User
    {
        [Key]
        public string EmailAdress { get; set; }

        [StringLength(100)]
        public string? AuthenticationKey { get; set; } = null!;

        public bool IsAdmin { get; set; }

        public ICollection<Project> Projects { get; set; }
        public ICollection<SchoolProject> SchoolProjects { get; set; }

        public Company Company { get; set; } = null!;



        public User()
        {
            EmailAdress = string.Empty;

            Projects = new HashSet<Project>();
            SchoolProjects = new HashSet<SchoolProject>();
        }
    }
}
