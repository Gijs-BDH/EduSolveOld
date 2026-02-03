using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhPoint2dFactory : IPoint2dFactory
    {
        public IPoint2d Point2D(double x, double y)
        {
            var point = new Point2D(x, y);
            return new BdhPoint2dProxy(point);
        }
    }
}


