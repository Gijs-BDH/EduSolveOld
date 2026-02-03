using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class Company
    {
        [Key]
        public string Name { get; set; }

        public ICollection<BuildingConceptCatalog> Catalogs { get; set; }

        public Company()
        {
            Name = string.Empty;
        }
    }
}
