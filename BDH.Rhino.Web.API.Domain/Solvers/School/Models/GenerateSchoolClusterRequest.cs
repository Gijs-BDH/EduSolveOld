using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Interfaces;
using BDH.Rhino.Web.API.Domain.Solvers.School.Private;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Models
{
    public class GenerateSchoolClusterRequest : IOrderableCluster
    {
        private readonly ICollection<IXY> fixedPoints = new List<IXY>();

        public int NumberOfPointsToFind { get; }
        public int LowestLevel { get; }
        public int HighestLevel { get; }
        public int Levels { get; }
        public string Name { get; }
        public ICollection<IXY> FixedPoints { get; }
        public SchoolClusterShape Shape { get; }
        public ICollection<IPoint3d> Points { get; set; } = new List<IPoint3d>();
        public ICollection<string> Connections { get; }

        public GenerateSchoolClusterRequest(int numberOfPointsToFind, int lowestLevel, int highestLevel, int levels, string name, ICollection<IXY> fixedPoints, SchoolClusterShape shape, ICollection<string> connections)
        {
            this.fixedPoints = fixedPoints;

            FixedPoints = new List<IXY>();
            NumberOfPointsToFind = numberOfPointsToFind;
            LowestLevel = lowestLevel;
            HighestLevel = highestLevel;
            Levels = levels;
            Name = name;
            Shape = shape;
            Connections = connections;
        }

        //for now i choose not to return a new instance because of equality comparisons in the algorithm, and i am too lazy to implement iequatable and hashset overrides
        public GenerateSchoolClusterRequest Clean()
        {
            FixedPoints.Clear();
            foreach (var point in fixedPoints)
            {
                FixedPoints.Add(point);
            }

            Points = new List<IPoint3d>();
            return this;
        }
    }
}
