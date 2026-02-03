using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class BdhLine2dFactory : ILine2dFactory
    {
        public ILine2d Line(IXY start, IXY end)
        {
            return new BdhLine2dProxy(start, end);
        }
    }
}


