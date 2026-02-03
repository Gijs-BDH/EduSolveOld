using BDH.Rhino.Web.API.Domain.Bouwkosten;
using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConcept
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;


        public decimal BvoPerUnit { get; set; }
        public decimal M3PerUnit { get; set; }
        public int WoningenPerUnit { get; set; }
        public decimal ProductieKostenPerUnit { get; set; }
        public decimal MeerprijsEPC { get; set; }
        public decimal MeerprijsBENG { get; set; }
        public bool Stapelbaar { get; set; } = false;
        public bool IsPrivate { get; set; } = true;
        public double Width { get; set; }
        public double Depth { get; set; }
        public double Height { get; set; }
        public double GlazingFactor { get; set; }


        public BuildingConceptGeometry Geometry { get; set; } = null!;
        public User CreatedBy { get; set; } = null!;
        public Company Owner { get; set; } = null!;
        public BuildingConceptCatalog Catalog { get; set; } = null!;

        public decimal BouwkostenPerBVO => BvoPerUnit == 0 ? 0 : ProductieKostenPerUnit / BvoPerUnit;


        public TypologieKostenModel ToTypology()
        {
            return new TypologieKostenModel(Name, Id.ToString(), BouwkostenPerBVO, BvoPerUnit, false, WoningenPerUnit, MeerprijsEPC, MeerprijsBENG);
        }
    }
}
