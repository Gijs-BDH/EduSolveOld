namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IPolygon2d
    {
        IEnumerable<IPoint2d> EnumeratePoints();
        IEnumerable<ILine2d> EnumerateSegments();



        IBoundingBox2d CalculateBoundingBox();


        bool PointIsInside(IPoint2d point, bool onEdgeIsInside);
        bool IsCounterClockwise();
        bool IsClosed();
        bool HasZeroLengthSegment();
        bool HasSegments();


        IPolygon2d EnsureCounterClockwise();
        IPolygon2d EnsureClockwise();
        IPolygon2d EnsureClosed();
        IPolygon2d EnsureNoZeroLengthSegments();
        IPolygon2d Reverse();
        IPolygon2d Translate(IVector2d vector);
        IPolygon2d EnsureSeamOnConvexHull();
        IPolygon2d RotateAround(IPoint2d anchor, double rotation);
        IEnumerable<IPolygon2d> Inflate(double offset);
        IEnumerable<IPolygon2d> Deflate(double offset) => Inflate(-offset);
        IEnumerable<IPolygon2d> Split(IPolygon2d other);
        IEnumerable<IPolygon2d> Clip(IPolygon2d other);
        IEnumerable<IPolygon2d> Subtract(IPolygon2d from);
        IPoint2d ClosestPoint(IPoint2d testPoint);




        IEnumerable<IEnumerable<ILine2d>> Contour(double offset, double rotation = 0);
        IEnumerable<ILine2d> Clip(ILine2d line);
        IEnumerable<ILine2d> Trim(ILine2d line);
    }
}
