using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class GenericMassTransformationEntity
    {
        [Key]
        public Guid Id { get; set; }

        public Guid BouwconceptId { get; set; }

        public string BouwkostenTypologie { get; set; } = null!;

        public double LocationX { get; set; }

        public double LocationY { get; set; }

        public double Rotation { get; set; }

        public double Width { get; set; }

        public double Height { get; set; }

        public double Depth { get; set; }
    }
}
