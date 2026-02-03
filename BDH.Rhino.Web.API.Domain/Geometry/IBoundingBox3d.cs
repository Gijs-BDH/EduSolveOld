namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IBoundingBox3d
    {
        double MinX { get; }
        double MinY { get; }
        double MinZ { get; }
        double MaxX { get; }
        double MaxY { get; }
        double MaxZ { get; }
    }
}
