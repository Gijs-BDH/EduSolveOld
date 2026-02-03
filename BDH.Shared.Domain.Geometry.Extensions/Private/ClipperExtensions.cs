using Clipper2Lib;

namespace BDH.Shared.Domain.Geometry.Extensions.Private
{
    internal static class ClipperExtensions
    {
        public static Paths64 ToClipperMultiPolygon(this IEnumerable<Point2D> polygon)
        {
            var paths = new Paths64
            {
                polygon.ToClipperPolygon()
            };

            return paths;
        }
        public static Path64 ToClipperPolygon(this IEnumerable<Point2D> polygon)
        {
            var path = new Path64();
            foreach (var point in polygon)
            {
                path.Add(new Point64(point.X * BaseGeometryExtensions.precision, point.Y * BaseGeometryExtensions.precision));
            }
            return path;
        }
        public static IEnumerable<Polygon> ToPolygons(this Paths64 paths)
        {
            return paths.Select(path =>
            {
                if (path.Count < 3)
                {
                    if (path.Count == 2)
                    {
                        var line = new Line2D(
                            new Point2D(
                                path[0].X / BaseGeometryExtensions.precision,
                                path[0].Y / BaseGeometryExtensions.precision),
                            new Point2D(
                                path[1].X / BaseGeometryExtensions.precision,
                                path[1].Y / BaseGeometryExtensions.precision));
                        return line.PretendItsAPolygon();

                    }
                    throw new Exception("Cannot convert the Clipper solution path to a polygon because it has less than three points." +
                        "If this is expected, please use the ToLines() extension method to convert to solution to an enumerable of lines.");
                }

                var points = path.Select(p =>
                {
                    return new Point2D(p.X / BaseGeometryExtensions.precision, p.Y / BaseGeometryExtensions.precision);
                });
                return new Polygon(points);
            });
        }
        public static IEnumerable<Line2D> ToLines(this Paths64 paths)
        {
            return paths.Select(path =>
            {
                if (path.Count != 2)
                {
                    throw new Exception("Cannot convert clipper solution path to line because the path does not have 2 points.");
                }

                var start = new Point2D(path[0].X / BaseGeometryExtensions.precision, path[0].Y / BaseGeometryExtensions.precision);
                var end = new Point2D(path[1].X / BaseGeometryExtensions.precision, path[1].Y / BaseGeometryExtensions.precision);

                return new Line2D(start, end);
            });
        }
    }
}