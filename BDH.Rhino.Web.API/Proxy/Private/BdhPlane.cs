using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPlane : IPlane
    {
        public IVector3d Normal { get; }
        public IPoint3d Origin { get; }


        public BdhPlane(IVector3d normal, IPoint3d origin)
        {
            Normal = normal;
            Origin = origin;
        }


        public double Distance(IPoint3d point)
        {
            var bdhPlane = new Plane(Normal.T(), Origin.T());
            var target = point.T();
            return bdhPlane.SignedDistancePointToPlane(target);
        }
    }
}
