namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IColorRgbFactory
    {
        IColorRgb Create(int r, int g, int b);
    }
}