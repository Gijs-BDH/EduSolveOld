using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;
using BDH.Shared.Extensions;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhLine2dProxy : ILine2d
    {
        private readonly Line2D line;

        public double Length => line.Length;
        public IPoint2d Start => new BdhPoint2dProxy(line.StartPoint);
        public IPoint2d End => new BdhPoint2dProxy(line.EndPoint);


        public BdhLine2dProxy(Line2D line)
        {
            this.line = line;
        }
        public BdhLine2dProxy(IXY start, IXY end)
        {
            this.line = new Line2D(new Point2D(start.X, start.Y), new Point2D(end.X, end.Y));
        }



        public double AngleOnConventionalXyPlane()
        {
            return line.AngleOnConventionalXyPlane();
        }
        public ILine2d Reverse()
        {
            return line.Reverse().T();
        }
        public ILine2d Move(IVector2d translation)
        {
            return line.Move(translation.T()).T();
        }
        public ILine2d Extend(double extension)
        {
            return line.Extend(extension).T();
        }
        public ILine2d RotateAround(IPoint2d anchor, double radians)
        {
            return line.RotateAround(anchor.T(), radians).T();
        }
        public IVector2d ToVector()
        {
            return line.ToVector().T();
        }
        public IEnumerable<IPoint2d> Divide(double length)
        {
            return line.Divide(length).Select(p => p.T());
        }
        public IPoint2d ClosestPoint(IPoint2d testPoint)
        {
            return line.ClosestPoint(testPoint.T()).T();
        }
        public IPolygon2d Inflate(double offset, bool extendTips)
        {
            return line.Thicken(offset, extendTips).T();
        }

        public IPoint2d Parameter(double parameter)
        {
            if (parameter.IsAlmostEqual(1))
            {
                return End;
            }
            if (parameter.IsAlmostEqual(0))
            {
                return Start;
            }

            var vector = this.ToVector();
            var scaledVector = vector.Multiply(parameter);
            return Start.Translate(scaledVector);
        }

        public IEnumerable<IPolygon2d> Split(IPolygon2d polygon)
        {
            return line.Split(polygon.T()).Select(r => r.T());
        }

        public bool TryIntersect(ILine2d other, out IPoint2d? point)
        {
            point = null;

            var solution = this.T().TryIntersect(other.T(), out var p);
            if (solution)
            {
                point = p.T();
                return true;
            }

            return false;
        }
    }
}


