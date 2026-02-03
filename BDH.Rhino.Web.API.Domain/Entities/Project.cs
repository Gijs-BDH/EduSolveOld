using System.ComponentModel.DataAnnotations;


namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class Project
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public bool IsVersion2Compatible { get; set; } = false;

        public string BasePolygon { get; set; } = null!;

        public string CreatedBy { get; set; } = null!;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Required]
        public virtual ICollection<ProjectVersion> Versions { get; set; }

        public Project()
        {
            Versions = new HashSet<ProjectVersion>();
        }

    }
}
