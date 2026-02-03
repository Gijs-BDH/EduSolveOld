using BDH.Rhino.Web.API.Schema.Data;

namespace BDH.Rhino.Web.API.Schema.SchoolProject
{
    public class SchoolProjectVersionSchema
    {
        public string Name { get; set; } = null!;
        public double MinimumGridSize { get; set; }
        public double GridRotation { get; set; }
        public double GridTranslation { get; set; }
        public double LevelHeight { get; set; }
        public ICollection<Point2dData> Obstacles { get; set; } = null!;
        public ICollection<SchoolProjectVersionClusterSchema> Clusters { get; set; } = null!;
        public Guid ConstructionConceptId { get; set; }
        public int Seed { get; set; }
        public bool AllowDisconnected { get; set; }
    }
}
