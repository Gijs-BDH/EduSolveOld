using BDH.Rhino.Web.API.Domain.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Models
{
    public class GeneratedSchoolResponse
    {
        public ICollection<GeneratedClusterResponse> Clusters { get; set; } = null!;
        public double GridSize { get; set; }
        public double GridSizeY { get; set; }
        public int UsedSeed { get; set; }
        public int NumberOfCorners { get; set; }
    }
}
