using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class SchoolProjectVersion
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public double GridRotation { get; set; }
        public double GridTranslation { get; set; }
        public double GridHeight { get; set; }
        public double MinimumGridSize { get; set; }
        public ConstructionConcept ConstructionConcept { get; set; } = null!;
        public ICollection<IXY> Obstacles { get; set; }
        public ICollection<SchoolProjectVersionCluster> Clusters { get; set; }
        public int Seed { get; set; }
        public bool AllowDisconnected { get; set; }



        public SchoolProjectVersion()
        {
            Obstacles = new List<IXY>();
            Clusters = new List<SchoolProjectVersionCluster>();
        }
    }
}
