using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhVector2dProxy : IVector2d
    {
        private readonly Point2D point;

        public double X => point.X;
        public double Y => point.Y;
        public double Length => point.Length;


        public BdhVector2dProxy(Point2D point)
        {
            this.point = point;
        }
        public BdhVector2dProxy(Vector2D vector)
        {
            this.point = new Point2D(vector.X, vector.Y);
        }
        public BdhVector2dProxy(IPoint2d point)
        {
            this.point = new Point2D(point.X, point.Y);
        }
        public BdhVector2dProxy(double x, double y)
        {
            this.point = new Point2D(x, y);
        }



        public double CrossProduct(IVector2d other)
        {
            return new Vector2D(point).CrossProduct(other.T());
        }
        public double DotProduct(IVector2d other)
        {
            return new Vector2D(point).DotProduct(other.T());
        }
        public IVector2d Reverse()
        {
            return new Vector2D(point).Reverse().T();
        }
        public IVector2d Normalize()
        {
            return new Vector2D(point).Normalize().T();
        }
        public IVector2d Multiply(double length)
        {
            return new Vector2D(point).Multiply(length).T();
        }
        public IVector2d Rotate(double angle)
        {
            return new Vector2D(point).Rotate(angle).T();
        }

        public double AngleTo(IVector2d other)
        {
            return new Vector2D(point).AngleTo(other.T());
        }

        public IVector2d Absolute()
        {
            return new Vector2D(Math.Abs(point.X), Math.Abs(point.Y)).T();
        }

        public IXY Scalar(double scale)
        {
            return new Vector2D(point).Multiply(scale).T();
        }
    }
}


