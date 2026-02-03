using BDH.Rhino.Web.API.Schema.Data;

namespace BDH.Rhino.Web.API.Schema.SchoolProject
{
    public class GenerateSchoolClusterRequestData
    {
        public int BVO { get; set; }
        public int LowestLevel { get; set; }
        public int HighestLevel { get; set; }
        public int Levels { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<Point3dData> FixedPoints { get; set; } = new List<Point3dData>();
        public ICollection<bool> Shape { get; set; } = new List<bool>();
        public ICollection<string> Connections { get; set; } = new List<string>();
        public int ShapeWidth { get; set; }
    }
}
