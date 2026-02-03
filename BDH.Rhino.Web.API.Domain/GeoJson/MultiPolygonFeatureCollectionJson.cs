namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class MultiPolygonFeatureCollectionJson<TProperties> : BaseSerializable<MultiPolygonFeatureCollectionJson<TProperties>>
    {
        public string Type { get; set; }
        public int TotalFeatures => Features.Count;
        public ICollection<MultiPolygonJson<TProperties>> Features { get; set; }
    }
}
