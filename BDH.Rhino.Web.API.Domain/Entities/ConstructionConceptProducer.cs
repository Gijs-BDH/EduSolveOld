using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class ConstructionConceptProducer
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<ConstructionConcept> Products { get; set; } = new HashSet<ConstructionConcept>();
    }
}
