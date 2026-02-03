using BDH.Rhino.Web.API.Schema.Data;

namespace BDH.Rhino.Web.API.Schema.SchoolProject
{
    public class SchoolProjectVersionClusterSchema
    {
        public double BVO { get; set; }
        public string Name { get; set; } = null!;
        public int LowestLevel { get; set; }
        public int HighestLevel { get; set; }
        public int Levels { get; set; }
        public ICollection<Point2dData> FixedPoints { get; set; } = null!;
        public ICollection<string> Connections { get; set; } = null!;
        public string Color { get; set; } = null!;
        public bool[] Shape { get; set; } = Array.Empty<bool>();
        public int ShapeWidth { get; set; }

    }
}
