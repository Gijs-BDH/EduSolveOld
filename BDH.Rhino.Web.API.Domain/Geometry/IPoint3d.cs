namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IPoint3d : IXYZ
    {
        double DistanceTo(IPoint3d other);
        IPoint3d Translate(IVector3d vector);
    }
}