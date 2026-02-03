namespace BDH.Rhino.Web.API.Domain.Geometry
{
    public interface IMatrix2d<TCell>
    {

    }

    public interface IPlane
    {
        IVector3d Normal { get; }
        IPoint3d Origin { get; }
        double Distance(IPoint3d point);
    }
}
