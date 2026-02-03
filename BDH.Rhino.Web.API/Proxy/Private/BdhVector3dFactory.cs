using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhVector3dFactory : IVector3dFactory
    {
        public IVector3d Vector3D(double x, double y, double z)
        {
            var point = new Vector3D(x, y, z);
            return new BdhVector3dProxy(point);
        }
    }
}


