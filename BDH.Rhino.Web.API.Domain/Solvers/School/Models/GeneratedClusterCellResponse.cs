using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Models
{
    public class GeneratedClusterCellResponse
    {
        public GeneratedPointResponse Point { get; set; } = null!;
        public int Hoogte { get; set; }
        public bool[] NorthFacades { get; set; } = Array.Empty<bool>();
        public bool[] EastFacades { get; set; } = Array.Empty<bool>();
        public bool[] SouthFacades { get; set; } = Array.Empty<bool>();
        public bool[] WestFacades { get; set; } = Array.Empty<bool>();
    }
}
