namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IPoint2d : IXY
    {
        double DistanceTo(IPoint2d other);
        IPoint2d Translate(IVector2d vector);
        /// <summary>
        /// Assumes a rotation with an angle in radians, counter clockwise around an anchor point
        /// </summary>
        /// <param name="other"></param>
        /// <param name="angle"></param>
        /// <returns></returns>
        IPoint2d RotateAround(IPoint2d other, double angle);
        /// <summary>
        /// Calculates a vector that when applied to a translation of the instance of the implementation results in the other point
        /// </summary>
        /// <param name="other"></param>
        /// <returns></returns>
        IVector2d To(IPoint2d other);
        ILine2d Segment(IPoint2d target);
        IPoint2d Scalar(double scale);
    }
}