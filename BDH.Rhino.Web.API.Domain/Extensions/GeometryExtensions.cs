using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;

namespace BDH.Rhino.Web.API.Domain.Extensions
{
    public static class GeometryExtensions
    {
        public static IPoint2d Average(this IEnumerable<IXY> points, IPoint2dFactory pointFactory)
        {
            var x = 0d;
            var y = 0d;
            var count = 0;
            foreach (var point in points)
            {
                x += point.X;
                y += point.Y;
                count++;
            }
            x /= count;
            y /= count;
            return pointFactory.Point2D(x, y);
        }

        public static IEnumerable<IPolygon2d> FromGeoJson(this IGeometry geometry, PolygonGeometryJson geoJson)
        {
            return geoJson.Coordinates.Select(shape =>
            {
                return geometry.Polygon(shape.Select(p => geometry.Point2D((double)p.ElementAt(0), (double)p.ElementAt(1))));
            });
        }


    }
}