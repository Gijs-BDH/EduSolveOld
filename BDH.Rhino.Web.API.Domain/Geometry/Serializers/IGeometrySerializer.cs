namespace BDH.Rhino.Web.API.Domain.Geometry.Serializers
{
    public interface IGeometrySerializer<TGeometry>
    {
        TGeometry FromString(string value);
        string ToString(TGeometry geometry);
    }
}
