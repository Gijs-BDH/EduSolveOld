
using BDH.Rhino.Web.API.Domain.Geometry;

public interface IPoint3dFactory
{
    IPoint3d Point3D(double x, double y, double z);
}
