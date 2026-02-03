using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhVector2dFactory : IVector2dFactory
    {
        public IVector2d Vector2D(double x, double y)
        {
            var point = new Point2D(x, y);
            return new BdhVector2dProxy(point);
        }
    }
}


