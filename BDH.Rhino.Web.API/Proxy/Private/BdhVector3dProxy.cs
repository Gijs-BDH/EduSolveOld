using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhVector3dProxy : IVector3d
    {
        private readonly Vector3D vector;

        public double X => vector.X;

        public double Y => vector.Y;

        public double Z => vector.Z;


        public BdhVector3dProxy(Vector3D point)
        {
            vector = point;
        }
    }
}


