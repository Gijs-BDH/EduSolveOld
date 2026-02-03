using BDH.Shared.Domain.Geometry.Extensions.Private;
using Clipper2Lib;

namespace BDH.Shared.Domain.Geometry.Extensions
{
    public static class PolygonExtensions
    {
        /// <summary>
        /// Returns a boolean indicating if the polygon's first and last point have a distance to each other smaller than the globally defined tolerance.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static bool IsClosed(this Polygon polygon)
        {
            if (polygon.Points.Count() < 3)
            {
                return false;
            }

            return polygon.Points.First().AlmostEqual(polygon.Points.Last());
        }
        /// <summary>
        /// Returns a boolean indicating if the polygon's first and last point have a distance to each other greater than the globally defined tolerance.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static bool IsOpen(this Polygon polygon)
        {
            return !polygon.IsClosed();
        }
        /// <summary>
        /// Returns a boolean indicating if the polygon has line segments with a length smaller than de globally defined tolerance.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static bool HasZeroLengthSegment(this Polygon polygon)
        {
            return polygon.EnumerateSegments().Any(s => s.Length < BaseGeometryExtensions.tolerance);
        }
        /// <summary>
        /// Returns a boolean indicating of the polygon is counter clockwise, according to the seam on the convex hull.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static bool IsCounterClockwise(this Polygon polygon)
        {
            if (!polygon.IsClosed())
            {
                throw new Exception("Cannot determine the direction of a polygon if it is not closed.");
            }

            if (polygon.HasZeroLengthSegment())
            {
                throw new Exception("Cannot determine the direction of a polygon if it has zero length segments.");
            }

            var pointList = polygon.Points
                .SkipLast(1)
                .ToList();

            var seamPoint = pointList
                //belangrijk, de gekozen origin moet op de convex hull liggen, daarom sorteren op y minimaal
                .OrderBy(point => point.Y)
                //voor de zekerheid
                .ThenByDescending(point => point.X)
                .First();

            var indexOfOrigin = pointList
                .IndexOf(seamPoint);

            var previousPointIndex = pointList.PreviousSafeIndex(indexOfOrigin);
            var nextPointIndex = pointList.NextSafeIndex(indexOfOrigin);

            var lastPointBeforeSeam = pointList[previousPointIndex];
            var firstPointAfterSeam = pointList[nextPointIndex];

            var ab = seamPoint.To(lastPointBeforeSeam);
            var bc = seamPoint.To(firstPointAfterSeam);

            //clockwise: sign negatief
            //counter clockwise: sign positief
            //source https://en.wikipedia.org/wiki/Curve_orientation
            return ab.CrossProduct(bc) > 0;
        }
        /// <summary>
        /// Returns a boolean indicating if the polygon has line segments, or more than or equal to 2 points.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static bool HasSegments(this Polygon polygon)
        {
            return polygon.Points.Count() >= 2;
        }



        /// <summary>
        /// Calculates the closest point on a polygon shape to a testpoint. 
        /// Note that the closest point will always be on one of the polygon edges, not the shape itself, even if the testpoint is inside of the polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="testPoint"></param>
        /// <returns></returns>
        /// <exception cref="Exception">Thrown if the polygon has no segments.</exception>
        public static Point2D ClosestPoint(this Polygon polygon, Point2D testPoint)
        {
            if (!polygon.HasSegments())
            {
                throw new Exception("Cannot calculate the closest point to a polygon if it has no segments.");
            }

            var closestPoint = polygon.EnumerateSegments().First().ClosestPoint(testPoint);
            var closestDistance = testPoint.DistanceTo(closestPoint);

            foreach (var segment in polygon.EnumerateSegments().Skip(1))
            {
                var segmentPoint = segment.ClosestPoint(testPoint);
                var segmentdistance = segmentPoint.DistanceTo(testPoint);

                if (segmentdistance < closestDistance)
                {
                    closestDistance = segmentdistance;
                    closestPoint = segmentPoint;
                }
            }

            return closestPoint;
        }



        /// <summary>
        /// Enumerates the polygon line segments.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static IEnumerable<Line2D> EnumerateSegments(this Polygon polygon)
        {
            var points = polygon.Points;

            var lastPoint = points.First();
            foreach (var point in points.Skip(1))
            {
                yield return lastPoint.Segment(point);

                lastPoint = point;
            }
        }
        /// <summary>
        /// Slices the polygon with parallel lines with a set distance from each other, returns those lines clipped to the inside of the polygon.
        /// Note that this method returns an enumerable of an enumerable, where each clipped line of the contour contains multiple lines.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="offset"></param>
        /// <param name="rotation"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static IEnumerable<IEnumerable<Line2D>> Contour(this Polygon polygon, double offset, double rotation = 0)
        {
            if (offset < BaseGeometryExtensions.tolerance)
            {
                throw new Exception("Cannot create an offset for a value too close to zero.");
            }

            var anchorPoint = new Point2D(0, 0);
            //rotate reverse
            var rotatedPolygon = polygon.RotateAround(anchorPoint, -rotation);
            var bbox = rotatedPolygon.CalculateBoundingBox();

            var distanceTravelled = 0d;
            var shapeHeight = bbox.Max.Y - bbox.Min.Y;
            while (distanceTravelled < shapeHeight)
            {
                var y = bbox.Min.Y + distanceTravelled;

                var bdhLine = new Line2D(new Point2D(bbox.Min.X, y), new Point2D(bbox.Max.X, y));
                //rotate back
                var rotatedLine = bdhLine.RotateAround(anchorPoint, rotation);
                yield return polygon.Clip(rotatedLine);

                distanceTravelled += offset;
            }
        }
        /// <summary>
        /// Substracts the regions of the line that are outside of the polygon and returns the line inside.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="line"></param>
        /// <returns></returns>
        public static IEnumerable<Line2D> Clip(this Polygon polygon, Line2D line)
        {
            var clippingPath = polygon.Points.ToClipperMultiPolygon();
            var subjectPath = new[] { line.StartPoint, line.EndPoint }.ToClipperMultiPolygon();

            var solution = new Paths64();
            var clipper = new Clipper64();
            clipper.AddClip(clippingPath);
            clipper.AddOpenSubject(subjectPath);
            clipper.Execute(ClipType.Intersection, FillRule.EvenOdd, solution, solution);
            return solution.ToLines();
        }

        public static IEnumerable<Polygon> Clip(this Polygon polygon, Polygon other)
        {
            if (polygon.IsOpen())
            {
                throw new Exception("Cannot use this polygon to clip another, because it is open.");
            }

            var clippingPath = polygon.Points.ToClipperMultiPolygon();
            var subjectPath = other.Points.ToClipperMultiPolygon();

            var solution = new Paths64();
            var clipper = new Clipper64();
            clipper.AddClip(clippingPath);
            if (other.IsOpen())
            {
                clipper.AddOpenSubject(subjectPath);
            }
            else
            {
                clipper.AddSubject(subjectPath);
            }

            clipper.Execute(ClipType.Intersection, FillRule.EvenOdd, solution, solution);
            return solution.ToPolygons();
        }


        /// <summary>
        /// Substracts the regions of the line that are inside of the polygon and returns the outside lines.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="line"></param>
        /// <returns></returns>
        public static IEnumerable<Line2D> Trim(this Polygon polygon, Line2D line)
        {
            var clippingPath = polygon.Points.ToClipperMultiPolygon();
            var subjectPath = new[] { line.StartPoint, line.EndPoint }.ToClipperMultiPolygon();

            var solution = new Paths64();
            var clipper = new Clipper64();
            clipper.AddClip(clippingPath);
            clipper.AddOpenSubject(subjectPath);
            clipper.Execute(ClipType.Difference, FillRule.EvenOdd, solution, solution);
            return solution.ToLines();
        }



        /// <summary>
        /// Calculates the bounding box of the polygon points.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static BoundingBox2D CalculateBoundingBox(this Polygon polygon)
        {
            return new BoundingBox2D(polygon);
        }



        /// <summary>
        /// Ensures the direction of the polygon is counter clockwise, according to the seam on the convex hull.
        /// If this is not the case, the polygon is reversed and a new instance is returned.
        /// If this was already the case, the original instance is returned.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static Polygon EnsureCounterClockwise(this Polygon polygon)
        {
            if (polygon.IsCounterClockwise())
            {
                return polygon;
            }

            return polygon.Reverse();
        }
        /// <summary>
        /// Reversed the order of the points in the polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static Polygon Reverse(this Polygon polygon)
        {
            return new Polygon(polygon.Points.Reverse());
        }
        /// <summary>
        /// Ensures the direction of the polygon is clockwise, according to a seam located on the convext hull.
        /// If this is not the case, the points are reversed and a new instance is returned.
        /// If this was already the case, the original instance is returned.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static Polygon EnsureClockwise(this Polygon polygon)
        {
            if (polygon.IsCounterClockwise())
            {
                return polygon.Reverse();
            }

            return polygon;
        }
        /// <summary>
        /// Ensures the last and the first point of the polygon have a distance to each other smaller than the globally allowed tolerance.
        /// If this is not the case, a duplicate of the first point is appended to the pointcollection.
        /// If this was already the case, the original instance is returned.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static Polygon EnsureClosed(this Polygon polygon)
        {
            if (polygon.IsClosed())
            {
                return polygon;
            }

            var points = polygon.Points.ToList();
            points.Add(polygon.Points.First());

            return new Polygon(points);
        }
        /// <summary>
        /// Ensures the polygon has no segments with a length smaller than the globally allowed tolerance. If that is already the case, the original instance is returned.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        public static Polygon EnsureNoZeroLengthSegments(this Polygon polygon)
        {
            if (!polygon.HasZeroLengthSegment())
            {
                return polygon;
            }

            var points = new List<Point2D>();
            foreach (var point in polygon.Points)
            {
                var lastPoint = points.LastOrDefault();
                if (lastPoint is not null)
                {
                    var dist = lastPoint.DistanceTo(point);
                    if (dist < BaseGeometryExtensions.tolerance)
                    {
                        continue;
                    }
                }

                points.Add(point);
            }

            return new Polygon(points);
        }
        /// <summary>
        /// Ensures the polygon has it's seam (first point) on the convext hull. If that is already the case, the original instance is returned.
        /// </summary>
        /// <param name="polygon"></param>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        public static Polygon EnsureSeamOnConvexHull(this Polygon polygon)
        {
            var indexable = polygon.Points
                .ToList();

            var origin = indexable
                .OrderBy(point => point.Y)
                .ThenByDescending(point => point.X)
                .First();

            var index = indexable.IndexOf(origin);
            if (index == -1)
            {
                throw new InvalidOperationException("The author of the method screwed up.");
            }

            var points = new List<Point2D>();
            for (int i = index; i < index + indexable.Count; i++)
            {
                var safeIndex = i % indexable.Count;

                var point = indexable[safeIndex];
                points.Add(point);
            }

            return new Polygon(points);
        }
        /// <summary>
        /// Rotates the polygon around a point with a rotation in radians, returns the resulting polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="anchor"></param>
        /// <param name="rotation"></param>
        /// <returns></returns>
        public static Polygon RotateAround(this Polygon polygon, Point2D anchor, double rotation)
        {
            var points = polygon.Points.Select(p => p.RotateAround(anchor, rotation));
            var _polygon = new Polygon(points);
            return _polygon;
        }
        /// <summary>
        /// Moves the polygon along a vector, returns the resulting polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="translation"></param>
        /// <returns></returns>
        public static Polygon Translate(this Polygon polygon, Vector2D translation)
        {
            return new Polygon(polygon.Points.Select(p => p.Translate(translation)));
        }



        /// <summary>
        /// Inflates the polygon, returns the resulting polygons.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Inflate(this Polygon polygon, double offset)
        {
            var points = polygon.Points.ToClipperMultiPolygon();

            var endType = polygon.IsClosed() ?
                EndType.Polygon : EndType.Square;
            //clipper defaults offset to outwards
            var offsetPolygons = Clipper.InflatePaths(points, offset * BaseGeometryExtensions.precision, JoinType.Miter, endType).ToPolygons();
            return offsetPolygons;
        }
        /// <summary>
        /// Deflates the polygon. Returns the resulting polygons.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Deflate(this Polygon polygon, double offset)
        {
            return polygon.Inflate(-offset);
        }
        /// <summary>
        /// Finds the overlapping regions between a set of polygons. Only the regions where all polygons occupy space are returned.
        /// </summary>
        /// <param name="polygons"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Intersection(this IEnumerable<Polygon> polygons)
        {
            if (!polygons.Any())
            {
                return new List<Polygon>();
            }

            var solution = polygons.First().Points.ToClipperMultiPolygon();
            foreach (var nextPolygon in polygons.Skip(1))
            {
                var polygonPath = nextPolygon.Points.ToClipperMultiPolygon();
                solution = Clipper.Intersect(solution, polygonPath, FillRule.EvenOdd);
            }

            return solution.ToPolygons();
        }
        /// <summary>
        /// Finds the overlapping regions between two polygons.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="other"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Intersection(this Polygon polygon, Polygon other)
        {
            var solution = polygon.Points.ToClipperMultiPolygon();
            var polygonPath = other.Points.ToClipperMultiPolygon();
            solution = Clipper.Intersect(solution, polygonPath, FillRule.EvenOdd);
            return solution.ToPolygons();
        }
        /// <summary>
        /// Will substract the second region from the first and return the remaining polygons.
        /// </summary>
        /// <param name="first"></param>
        /// <param name="second"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Difference(this Polygon first, Polygon second)
        {
            var solution = first.Points.ToClipperMultiPolygon();
            var polygonPath = second.Points.ToClipperMultiPolygon();
            solution = Clipper.Difference(solution, polygonPath, FillRule.EvenOdd);
            return solution.ToPolygons();
        }
        /// <summary>
        /// Splits the polygon with a split line.
        /// Note that due to the limitations of the current algorithm, splitter line is inflated by 1/1000th of a unit, so the resulting polygons may not fully overlap with the original polygon.
        /// </summary>
        /// <param name="polygon"></param>
        /// <param name="line"></param>
        /// <returns></returns>
        public static IEnumerable<Polygon> Split(this Polygon polygon, Line2D line)
        {
            var hitSegments = 0;
            foreach (var segment in polygon.EnumerateSegments())
            {
                if (segment.TryIntersect(line, out _))
                {
                    hitSegments++;
                }

                if (hitSegments >= 2)
                {
                    break;
                }
            }
            if (hitSegments < 2)
            {
                return new[] { polygon };
            }

            var offset = 5d;
            var splitter = line.Thicken(offset, false);
            var res = polygon.Difference(splitter);
            return res;
        }
        public static IEnumerable<Polygon> Split(this Polygon splitter, Polygon toSplit)
        {
            if (splitter.IsClosed())
            {
                throw new Exception("Cannot split a polygon with a closed polygon. Please ensure the first instance is open.");
            }

            if (toSplit.IsOpen())
            {
                throw new Exception("Cannot split a polygon that is open. Please ensure it is closed first.");
            }

            var offset = 1d;
            var slightlyInflated = splitter.Inflate(offset).First().EnsureClosed();
            var solution = toSplit.Points.ToClipperMultiPolygon();
            var polygonPath = slightlyInflated.Points.ToClipperMultiPolygon();
            solution = Clipper.Difference(solution, polygonPath, FillRule.EvenOdd);

            if (solution.Count == 0)
            {
                return Array.Empty<Polygon>();
            }
            if (solution.Count == 1)
            {
                return new[] { toSplit };
            }

            return solution.ToPolygons();
        }

        public static IEnumerable<Polygon> Union(this IEnumerable<Polygon> polygons)
        {
            if (!polygons.Any())
            {
                return Array.Empty<Polygon>();
            }

            var first = polygons.First();
            var solution = first.Points.ToClipperMultiPolygon();

            foreach (var polygon in polygons.Skip(1))
            {
                var secondPath = polygon.Points.ToClipperMultiPolygon();
                solution = Clipper.Union(solution, secondPath, FillRule.EvenOdd);
            }

            return solution.ToPolygons();
        }

    }
}