using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BoundingBox2dProxy : IBoundingBox2d
    {
        private readonly IPoint2d min;
        private readonly IPoint2d max;

        public BoundingBox2dProxy(Polygon polygon)
        {
            min = new BdhPoint2dProxy(polygon.BoundingBoxMinimum.X, polygon.BoundingBoxMinimum.Y);
            max = new BdhPoint2dProxy(polygon.BoundingBoxMaximum.X, polygon.BoundingBoxMaximum.Y);
        }

        public IPoint2d Min => min;
        public IPoint2d Max => max;
    }

}
