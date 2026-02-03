using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPoint3dFactory : IPoint3dFactory
    {
        public IPoint3d Point3D(double x, double y, double z)
        {
            var point = new Point3DNew(x, y, z);
            return new BdhPoint3dProxy(point);
        }
    }
}


