using BDH.Rhino.Web.API.Domain.Geometry.Serializers;

namespace BDH.Rhino.Web.API.Domain.Geometry.Factories
{
    public interface IGeometrySerializer
    {
        IPolylineCollectionSerializer PolylineCollectionSerializer { get; }
        IPoint2dCollectionSerializer PointCollectionSerializer { get; }
    }
}