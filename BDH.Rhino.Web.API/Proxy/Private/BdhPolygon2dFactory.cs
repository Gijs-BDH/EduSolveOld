using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPolygon2dFactory : IPolygon2dFactory
    {

        public BdhPolygon2dFactory()
        {

        }

        public IPolygon2d Polygon(IEnumerable<IXY> points)
        {
            if (points.ElementAtOrDefault(2) is null)
            {
                var line = new BdhLine2dProxy(points.First(), points.ElementAt(1));
                points = new[]
                {
                    points.First(),
                    line.Parameter(0.5),
                    points.ElementAt(1)
                };
            }
            var polygon = new Polygon(points.Select(p => new Point2D(p.X, p.Y)));
            return new BdhPolygon2dProxy(polygon);
        }

        public IEnumerable<IPolygon2d> FromGeoJson(PolygonGeometryJson geoJson)
        {
            return geoJson.Coordinates.Select(shape =>
            {
                var polygon = new Polygon(shape.Select(p => new Point2D((double)p.ElementAt(0), (double)p.ElementAt(1))));
                return new BdhPolygon2dProxy(polygon);
            });
        }
    }
}
