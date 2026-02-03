using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface IOrderableCluster
    {
        int LowestLevel { get; }
        int HighestLevel { get; }
        ICollection<IXY> FixedPoints { get; }
        string Name { get; }
    }
}
