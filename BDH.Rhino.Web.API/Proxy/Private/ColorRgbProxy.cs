using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class ColorRgbProxy : IColorRgb
    {
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }


        public ColorRgbProxy(int r, int g, int b)
        {
            R = r;
            G = g;
            B = b;
        }

    }
}
