using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPoint3dProxy : IPoint3d
    {
        private readonly Point3DNew point;

        public double X => point.X;

        public double Y => point.Y;

        public double Z => point.Z;

        public BdhPoint3dProxy(Point3DNew point)
        {
            this.point = point;
        }



        public double DistanceTo(IPoint3d other)
        {
            return point.DistanceTo(other.T());
        }

        public IPoint3d Translate(IVector3d vector)
        {
            return (point + vector.T()).T();
        }

        public IXY Scalar(double scale)
        {
            throw new NotImplementedException();
        }
    }
}


