namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class TransformJson : JsonCollection<TransformJson>
    {
        public ICollection<decimal> Elements { get; set; }
    }
}
