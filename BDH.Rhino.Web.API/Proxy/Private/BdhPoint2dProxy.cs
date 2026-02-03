using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPoint2dProxy : IPoint2d
    {
        private readonly Point2D point;

        public double X => point.X;
        public double Y => point.Y;


        public BdhPoint2dProxy(Point2D point)
        {
            this.point = point;
        }
        public BdhPoint2dProxy(double x, double y)
        {
            point = new Point2D(x, y);
        }



        public double DistanceTo(IPoint2d other)
        {
            return point.DistanceTo(other.T());
        }

        public IPoint2d RotateAround(IPoint2d other, double angle)
        {
            return point.RotateAround(other.T(), angle).T();
        }
        public IPoint2d Translate(IVector2d vector)
        {
            return point.Translate(vector.T()).T();
        }

        public IVector2d To(IPoint2d other)
        {
            return point.To(other.T()).T();
        }

        public ILine2d Segment(IPoint2d target)
        {
            return point.Segment(target.T()).T();
        }

        public IPoint2d Scalar(double scale)
        {
            return new BdhPoint2dProxy(X * scale, Y * scale);
        }
    }
}


