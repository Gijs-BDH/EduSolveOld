using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class ColorRgbFactory : IColorRgbFactory
    {
        public IColorRgb Create(int r, int g, int b)
        {
            return new ColorRgbProxy(r, g, b);
        }
    }
}
