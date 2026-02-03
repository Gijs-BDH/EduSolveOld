namespace BDH.Rhino.Web.API.Domain.Geometry.Factories
{
    public interface IPolygon2dFactory
    {
        IPolygon2d Polygon(IEnumerable<IXY> points);
    }
}
