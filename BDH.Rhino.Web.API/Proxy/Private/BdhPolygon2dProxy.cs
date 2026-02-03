using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPolygon2dProxy : IPolygon2d
    {
        private readonly Polygon polygon;

        public IEnumerable<IPoint2d> EnumeratePoints() =>
            polygon.Points.Select(p => p.T());
        public IEnumerable<ILine2d> EnumerateSegments()
        {
            return polygon.EnumerateSegments().Select(l => l.T());
        }


        public BdhPolygon2dProxy(Polygon polygon)
        {
            this.polygon = polygon;
        }
        public BdhPolygon2dProxy(IEnumerable<Point2D> points)
        {
            polygon = new Polygon(points);
        }
        public BdhPolygon2dProxy(IEnumerable<IXY> points)
        {
            polygon = new Polygon(points.Select(p => new Point2D(p.X, p.Y)));
        }


        public IBoundingBox2d CalculateBoundingBox()
        {
            return new BoundingBox2dProxy(polygon);
        }



        public bool IsCounterClockwise()
        {
            return polygon.IsCounterClockwise();
        }
        public bool IsClosed()
        {
            return polygon.IsClosed();
        }
        public bool HasZeroLengthSegment()
        {
            return polygon.HasZeroLengthSegment();
        }
        public bool HasSegments()
        {
            return polygon.HasSegments();
        }
        public bool PointIsInside(IPoint2d point, bool onEdgeIsInside)
        {
            var bdhPoint = new Point2D(point.X, point.Y);
            return polygon.PointIsInside(bdhPoint, 5, onEdgeIsInside);
        }



        public IPolygon2d EnsureCounterClockwise()
        {
            return polygon.EnsureCounterClockwise().T();
        }
        public IPolygon2d EnsureClockwise()
        {
            return polygon.EnsureClockwise().T();
        }
        public IPolygon2d EnsureClosed()
        {
            return polygon.EnsureClosed().T();
        }
        public IPolygon2d EnsureNoZeroLengthSegments()
        {
            return polygon.EnsureNoZeroLengthSegments().T();
        }
        public IPolygon2d Reverse()
        {
            return polygon.Reverse().T();
        }
        public IPolygon2d EnsureSeamOnConvexHull()
        {
            return polygon.EnsureSeamOnConvexHull().T();
        }
        public IPolygon2d RotateAround(IPoint2d anchor, double rotation)
        {
            return polygon.RotateAround(anchor.T(), rotation).T();
        }
        public IPolygon2d Translate(IVector2d vector)
        {
            return new Polygon(polygon.Points.Select(p => p.Translate(vector.T()))).T();
        }
        public IEnumerable<IPolygon2d> Inflate(double offset)
        {
            return polygon.Inflate(offset).Select(p => p.T());
        }
        public IEnumerable<IPolygon2d> Split(IPolygon2d other)
        {
            return this.T().Split(other.T()).Select(e => e.T());
        }
        public IEnumerable<IPolygon2d> Clip(IPolygon2d other)
        {
            return this.T().Clip(other.T()).Select(e => e.T());
        }
        public IEnumerable<IPolygon2d> Subtract(IPolygon2d from)
        {
            return from.T().Difference(this.T()).Select(p => p.T());
        }

        public IPoint2d ClosestPoint(IPoint2d testPoint)
        {
            return polygon.ClosestPoint(testPoint.T()).T();
        }






        public IEnumerable<IEnumerable<ILine2d>> Contour(double offset, double rotation = 0)
        {
            return polygon.Contour(offset, rotation).Select(li => li.Select(l => l.T()));
        }



        public IEnumerable<ILine2d> Clip(ILine2d line)
        {
            return polygon.Clip(line.T()).Select(c => c.T());
        }
        public IEnumerable<ILine2d> Trim(ILine2d line)
        {
            return polygon.Trim(line.T()).Select(c => c.T());
        }


    }
}
