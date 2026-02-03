namespace BDH.Rhino.Web.API.Domain.Geometry.Factories
{
    public interface IGeometry : IGeometryFactory, IGeometrySerializer
    {
        IEnumerable<ILine2d> Connect(IEnumerable<IPoint2d> points);
        IEnumerable<IPolygon2d> Union(IEnumerable<IPolygon2d> polygons);
    }
}