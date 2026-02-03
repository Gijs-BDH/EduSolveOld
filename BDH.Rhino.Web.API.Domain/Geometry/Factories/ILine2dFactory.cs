
using BDH.Rhino.Web.API.Domain.Geometry;

public interface ILine2dFactory
{
    ILine2d Line(IXY start, IXY end);
}
