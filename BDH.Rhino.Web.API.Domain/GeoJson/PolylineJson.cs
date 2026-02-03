namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class PolylineJson<TProperties> : BaseSerializable<PolylineJson<TProperties>>
    {
        public string Type { get; set; }
        public PolylineGeometryJson Geometry { get; set; }
        public TProperties Properties { get; set; }
    }

}
