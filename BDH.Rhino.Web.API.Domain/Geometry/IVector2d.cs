namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IVector2d : IXY
    {
        double Length { get; }
        double CrossProduct(IVector2d other);
        double DotProduct(IVector2d other);
        double AngleOnConventionalXyPlane() => Math.Atan2(Y, X);
        double AngleTo(IVector2d other);
        IVector2d Reverse();
        IVector2d Normalize();
        IVector2d Multiply(double length);
        IVector2d Rotate(double angle);
        IVector2d Absolute();
    }
}