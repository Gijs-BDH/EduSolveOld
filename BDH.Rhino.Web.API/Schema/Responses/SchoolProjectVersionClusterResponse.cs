using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class SchoolProjectVersionClusterResponse : IOrderableCluster
    {
        private readonly SchoolProjectVersionCluster cluster;
        private readonly IColorRgbSerialier colorRgbSerialier;

        public Guid Id => cluster.Id;
        public string Name => cluster.Name;
        public double BVO => cluster.BVO;
        public int LowestLevel => cluster.LowestLevel;
        public int HighestLevel => cluster.HighestLevel;
        public int Levels => cluster.Levels;
        public ICollection<IXY> FixedPoints => cluster.FixedPoints;
        public ICollection<string> Connections => cluster.Connections;
        public string Color => colorRgbSerialier.ToString(cluster.Color);
        public bool[] Shape => cluster.Shape;
        public int ShapeWidth => cluster.ShapeWidth;


        public SchoolProjectVersionClusterResponse(SchoolProjectVersionCluster cluster, IColorRgbSerialier colorRgbSerialier)
        {
            this.cluster = cluster;
            this.colorRgbSerialier = colorRgbSerialier;
        }
    }
}
