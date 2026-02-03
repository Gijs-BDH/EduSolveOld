using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConceptTransformationEntity
    {
        [Key]
        public Guid Id { get; set; }

        public Guid BouwconceptId { get; set; }

        public double LocationX { get; set; }

        public double LocationY { get; set; }

        public double Rotation { get; set; }

        public int Verdiepingen { get; set; }
    }
}
