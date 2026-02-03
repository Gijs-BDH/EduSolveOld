using BDH.Shared.Domain.Geometry.Extensions.Private;

namespace BDH.Shared.Domain.Geometry.Extensions
{
    public static class Point2DExtensions
    {
        /// <summary>
        /// Creates a line between the two points.
        /// </summary>
        /// <param name="point"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        public static Line2D Segment(this Point2D point, Point2D target)
        {
            return new Line2D(point, target);
        }



        /// <summary>
        /// Indicates if the first and the second point have a distance closer than the globally defined tolerance.
        /// </summary>
        /// <param name="point"></param>
        /// <param name="other"></param>
        /// <returns></returns>
        public static bool AlmostEqual(this Point2D point, Point2D other)
        {
            return point.AlmostEqual(other, BaseGeometryExtensions.tolerance);
        }



        /// <summary>
        /// Returns a vector that, when applied to a translation of the first point, results in the second point.
        /// </summary>
        /// <param name="point"></param>
        /// <param name="other"></param>
        /// <returns></returns>
        public static Vector2D To(this Point2D point, Point2D other)
        {
            var delta = new Point2D(other.X - point.X, other.Y - point.Y);
            return new Vector2D(delta);
        }



        /// <summary>
        /// Rotates the point around the other point with a degree in radians.
        /// </summary>
        /// <param name="point"></param>
        /// <param name="other"></param>
        /// <param name="angle"></param>
        /// <returns></returns>
        public static Point2D RotateAround(this Point2D point, Point2D other, double angle)
        {
            var x1 = point.X - other.X;
            var y1 = point.Y - other.Y;

            var x2 = x1 * Math.Cos(angle) - y1 * Math.Sin(angle);
            var y2 = x1 * Math.Sin(angle) + y1 * Math.Cos(angle);

            var newx = x2 + other.X;
            var newy = y2 + other.Y;

            var bdhPoint = new Point2D(newx, newy);
            return bdhPoint;
        }
        /// <summary>
        /// Translates the point along a vector.
        /// </summary>
        /// <param name="point"></param>
        /// <param name="vector"></param>
        /// <returns></returns>
        public static Point2D Translate(this Point2D point, Vector2D vector)
        {
            var result = point + new Point2D(vector.X, vector.Y);
            return result;
        }
        /// <summary>
        /// Averages the set of points. Note that if the set is empty, an exception will be thrown.
        /// </summary>
        /// <param name="points"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static Point2D Average(this IEnumerable<Point2D> points)
        {
            if (!points.Any())
            {
                throw new Exception("Cannot find the average of an empty set of points.");
            }

            var avgX = points.First().X;
            var avgY = points.First().Y;
            var counted = 1;
            foreach (var point in points.Skip(1))
            {
                avgX += point.X;
                avgY += point.Y;
                counted++;
            }

            avgX /= counted;
            avgY /= counted;
            return new Point2D(avgX, avgY);
        }


        public static IEnumerable<Line2D> Connect(this IEnumerable<Point2D> points)
        {
            if (!points.TryGetNonEnumeratedCount(out int count))
            {
                count = points.Count();
            }
            if (count < 2)
            {
                throw new Exception("Cannot connect this set of points because there are less than two.");
            }

            var firstPoint = points.First();
            foreach (var secondPoint in points.Skip(1))
            {
                var line = new Line2D(firstPoint, secondPoint);
                yield return line;

                firstPoint = secondPoint;
            }
        }
    }
}