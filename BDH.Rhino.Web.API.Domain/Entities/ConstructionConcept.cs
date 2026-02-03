using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class ConstructionConcept
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public double SpanWidth { get; set; }
        public double SpanLength { get; set; }
        public ConstructionConceptProducer Producer { get; set; } = null!;
    }
}
