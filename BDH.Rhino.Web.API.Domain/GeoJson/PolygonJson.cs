namespace BDH.Rhino.Web.API.Domain.GeoJson
{

    public class PolygonJson<TProperties> : BaseSerializable<PolygonJson<TProperties>>
    {
        public string Type { get; set; } = null;
        public PolygonGeometryJson Geometry { get; set; } = null;
        public TProperties Properties { get; set; }
    }
}
