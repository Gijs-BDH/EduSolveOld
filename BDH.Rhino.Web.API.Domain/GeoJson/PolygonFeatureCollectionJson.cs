namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class PolygonFeatureCollectionJson<TProperties> : BaseSerializable<PolygonFeatureCollectionJson<TProperties>>
    {
        public string Type { get; set; }
        public int TotalFeatures => Features.Count;
        public ICollection<PolygonJson<TProperties>> Features { get; set; }
    }
}
