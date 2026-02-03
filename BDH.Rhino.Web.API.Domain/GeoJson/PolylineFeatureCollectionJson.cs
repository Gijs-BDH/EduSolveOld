namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class PolylineFeatureCollectionJson<TProperties> : BaseSerializable<PolylineFeatureCollectionJson<TProperties>>
    {
        public string Type { get; set; }
        public int TotalFeatures => Features.Count;
        public ICollection<PolylineJson<TProperties>> Features { get; set; }
    }
}
