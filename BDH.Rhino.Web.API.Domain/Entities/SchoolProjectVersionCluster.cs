using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Entities
{

    public class SchoolProjectVersionCluster : IOrderableCluster
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public double BVO { get; set; }
        public int LowestLevel { get; set; }
        public int HighestLevel { get; set; }
        public int Levels { get; set; }
        public ICollection<IXY> FixedPoints { get; set; } = new List<IXY>();
        public bool[] Shape { get; set; } = Array.Empty<bool>();
        public int ShapeWidth { get; set; }
        public IColorRgb Color { get; set; } = null!;
        public ICollection<string> Connections { get; set; } = new List<string>();
    }
}
