namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class MultiPolygonJson<TProperties> : BaseSerializable<MultiPolygonJson<TProperties>>
    {
        public MultiPolygonGeometryJson Geometry { get; set; }
        public string Type { get; set; }
        public string ID { get; set; }
        public string GeometryName { get; set; }
        public TProperties Properties { get; set; }
    }
}
