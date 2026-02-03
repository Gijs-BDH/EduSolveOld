using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;

namespace BDH.Rhino.Web.API.Domain.Solvers.CityPatterns
{
    public class CityPatternsSolver
    {
        private readonly IGeometry geometry;

        public CityPatternsSolver(IGeometry geometry)
        {
            this.geometry = geometry;
        }
        public IEnumerable<IPolygon2d> Solve(IPolygon2d inputPolygon, BaseUrbanFabric urbanFabric, Random random)
        {
            var slightlyInflated = inputPolygon.Inflate(5).First().EnsureClosed();

            var lines = geometry.PolylineCollectionSerializer.FromString(urbanFabric.Data);
            var rotation = random.NextDouble() * Math.PI * 2;
            var polygons = lines
                .Select(collection =>
                {
                    var rotatedPoints = collection
                        .Select(p => p.RotateAround(geometry.Point2D(500, 500), rotation));
                    return geometry.Polygon(rotatedPoints);
                });
            var center = slightlyInflated
                .EnumerateSegments()
                .Select(s => s.Parameter(0.5))
                .Average(geometry);

            var firstPoint = geometry.Point2D(random.Next(200, 800), random.Next(200, 800));
            var translation = firstPoint.To(center);
            var translatedPolygons = polygons
                .Select(p => p.Translate(translation));
            var trimmedPolygons = translatedPolygons
                .SelectMany(p => slightlyInflated.Clip(p));
            return trimmedPolygons;
        }
    }
}
