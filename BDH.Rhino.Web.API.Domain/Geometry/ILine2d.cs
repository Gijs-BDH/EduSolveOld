namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface ILine2d
    {
        IPoint2d Start { get; }
        IPoint2d End { get; }
        double Length { get; }



        IPoint2d ClosestPoint(IPoint2d testPoint);
        IPoint2d Parameter(double parameter);
        IEnumerable<IPoint2d> Divide(double length);



        ILine2d Reverse();
        ILine2d Move(IVector2d translation);
        ILine2d Extend(double extension);
        ILine2d RotateAround(IPoint2d anchor, double radians);



        IVector2d ToVector();



        double AngleOnConventionalXyPlane();
        bool TryIntersect(ILine2d other, out IPoint2d? point);



        IPolygon2d Inflate(double offset, bool extendTips);
        IEnumerable<IPolygon2d> Split(IPolygon2d polygon);
    }
}
