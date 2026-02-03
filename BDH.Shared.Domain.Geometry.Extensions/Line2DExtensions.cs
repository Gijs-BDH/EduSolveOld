using BDH.Shared.Domain.Geometry.Extensions.Private;
using BDH.Shared.Extensions;
using Clipper2Lib;

namespace BDH.Shared.Domain.Geometry.Extensions
{
    public static class Line2DExtensions
    {
        /// <summary>
        /// Calculates the angle in radians from the x-axis on a conventional xy-plane.
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public static double AngleOnConventionalXyPlane(this Line2D line)
        {
            var vector = line.ToVector();
            return Math.Atan2(vector.Y, vector.X);
        }



        /// <summary>
        /// Returns a reversed line.
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public static Line2D Reverse(this Line2D line)
        {
            var _line = new Line2D(new Point2D(line.EndPoint.X, line.EndPoint.Y), new Point2D(line.StartPoint.X, line.StartPoint.Y));
            return _line;
        }
        /// <summary>
        /// Translates the start and endpoint of the line along a vector and returns a new line.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="translation"></param>
        /// <returns></returns>
        public static Line2D Move(this Line2D line, Vector2D translation)
        {
            return new Line2D(
                line.StartPoint.Translate(translation),
                line.EndPoint.Translate(translation));
        }
        /// <summary>
        /// Moves the endpoint of the line along it's own direction and returns a new line.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="extension"></param>
        /// <returns></returns>
        public static Line2D Extend(this Line2D line, double extension)
        {
            var vector = line.ToVector().Normalize();
            var newVectorLength = line.Length + extension;
            var extendedVector = vector.Multiply(newVectorLength);
            var newEndPoint = line.StartPoint.Translate(extendedVector);
            return new Line2D(line.StartPoint, newEndPoint);
        }
        /// <summary>
        /// Rotates both the start and endpoint around a point for a degree in radians and returns a new line.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="anchor"></param>
        /// <param name="radians"></param>
        /// <returns></returns>
        public static Line2D RotateAround(this Line2D line, Point2D anchor, double radians)
        {
            var firstPoint = line.StartPoint.RotateAround(anchor, radians);
            var endPoint = line.EndPoint.RotateAround(anchor, radians);
            return new Line2D(firstPoint, endPoint);
        }



        /// <summary>
        /// Assumes the startpoint as a new coordinate system origin (0,0) and returns the vector from this origin to the endpoint of the line.
        /// The lenght of the line is preserved in the length of the vector.
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public static Vector2D ToVector(this Line2D line)
        {
            var fromOrigin = new Point2D(line.EndPoint.X - line.StartPoint.X, line.EndPoint.Y - line.StartPoint.Y);
            return new Vector2D(fromOrigin);
        }



        /// <summary>
        /// Populates the line with points with a set distance from each other. If the distance is not a precise division of the length of the line, the last point may be omitted.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        /// <exception cref="Exception">Thrown if the length is too close to zero</exception>
        public static IEnumerable<Point2D> Divide(this Line2D line, double length)
        {
            if (length < BaseGeometryExtensions.tolerance)
            {
                throw new Exception("Cannot divide a line segment with a distance too close to zero.");
            }

            var lineLength = line.Length;
            var lineAsVector = line.ToVector();

            var travelledDistance = 0d;
            while (travelledDistance < lineLength)
            {
                var newPoint = line.StartPoint.Translate(lineAsVector.Normalize().Multiply(travelledDistance));
                yield return newPoint;

                travelledDistance += length;
            }
        }
        /// <summary>
        /// Calculates a point on the line that is the closest to the given testpoint.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="testPoint"></param>
        /// <returns></returns>
        public static Point2D ClosestPoint(this Line2D line, Point2D testPoint)
        {
            var AP = line.StartPoint.To(testPoint);         //Vector from A to P   
            var AB = line.StartPoint.To(line.EndPoint);     //Vector from A to B  

            var magnitudeAB = AB.Length * AB.Length;        //Magnitude of AB vector (it's length squared)     
            var ABAPproduct = AP.DotProduct(AB);            //The DOT product of a_to_p and a_to_b     
            var parameter = ABAPproduct / magnitudeAB;      //The normalized "distance" from a to your closest point  

            if (parameter < 0)                              //Check if P projection is over vectorAB     
            {
                return line.StartPoint;

            }
            else if (parameter > 1)
            {
                return line.EndPoint;
            }
            else
            {
                return line.StartPoint.Translate(AB.Multiply(parameter));
            }
        }



        /// <summary>
        /// Thickens the line into a polygon.
        /// </summary>
        /// <param name="line"></param>
        /// <param name="offset"></param>
        /// <param name="extendTips">If true, thickens the tips as well</param>
        /// <returns></returns>
        public static Polygon Thicken(this Line2D line, double offset, bool extendTips)
        {
            if (offset < BaseGeometryExtensions.tolerance)
            {
                throw new InvalidOperationException("Cannot inflate a line with a value too close to or smaller than zero.");
            }

            var points = new[] { line.StartPoint, line.EndPoint }.ToClipperMultiPolygon();

            //clipper defaults offset to outwards
            var endType = extendTips ? EndType.Square : EndType.Butt;
            var offsetPolygons = Clipper.InflatePaths(points, offset * BaseGeometryExtensions.precision, JoinType.Miter, endType);
            return offsetPolygons.ToPolygons().First();
        }
        /// <summary>
        /// Divides the line into three points: the start- middle- and endpoint, so it's a polygon with three points.
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        public static Polygon PretendItsAPolygon(this Line2D line)
        {
            var points = new[]
            {
                line.StartPoint,
                line.StartPoint.Translate(line.ToVector().Multiply(0.5)),
                line.EndPoint
            };
            return new Polygon(points);
        }
        /// <summary>
        /// Splits the polygon with a split line.
        /// Note that due to the limitations of the current algorithm, splitter line is inflated by 1/1000th of a unit, so the resulting polygons may not fully overlap with the original polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="line"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Split(this Line2D line, Polygon polygon)
        {
            return polygon.Split(line);
        }
        /// <summary>
        /// return the intersection point of two lines, or null if they don't intersect. 
        /// </summary>
        /// <param name="line"></param>
        /// <param name="other"></param>
        /// <param name="intersection"></param>
        /// <returns></returns>
        public static bool TryIntersect(this Line2D line, Line2D other, out Point2D? intersection)
        {
            //https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
            intersection = null;

            var A = line.StartPoint;
            var B = line.EndPoint;
            var C = other.StartPoint;
            var D = other.EndPoint;

            // Line AB represented as a1x + b1y = c1
            double a1 = B.Y - A.Y;
            double b1 = A.X - B.X;
            double c1 = a1 * (A.X) + b1 * (A.Y);

            // Line CD represented as a2x + b2y = c2
            double a2 = D.Y - C.Y;
            double b2 = C.X - D.X;
            double c2 = a2 * (C.X) + b2 * (C.Y);

            double determinant = a1 * b2 - a2 * b1;

            if (determinant.IsAlmostEqual(0))
            {
                // The lines are parallel. This is simplified
                // by returning a pair of FLT_MAX
                return false;
            }
            else
            {
                double x = (b2 * c1 - b1 * c2) / determinant;
                double y = (a1 * c2 - a2 * c1) / determinant;

                intersection = new Point2D(x, y);
                var valid =
                    x >= Math.Min(A.X, B.X) && x <= Math.Max(A.X, B.X) &&
                    y >= Math.Min(A.Y, B.Y) && y <= Math.Max(A.Y, B.Y) &&
                    x >= Math.Min(C.X, D.X) && x <= Math.Max(C.X, D.X) &&
                    y >= Math.Min(C.Y, D.Y) && y <= Math.Max(C.Y, D.Y); ;
                return valid;

            }
        }
    }
}