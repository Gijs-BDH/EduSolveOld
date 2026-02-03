namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IBoundingBox2d
    {
        IPoint2d Min { get; }
        IPoint2d Max { get; }
    }
}
