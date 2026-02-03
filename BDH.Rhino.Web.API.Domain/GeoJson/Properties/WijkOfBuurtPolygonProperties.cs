namespace BDH.Rhino.Web.API.Domain.GeoJson.Properties
{
    public class WijkOfBuurtPolygonProperties : BaseSerializable<WijkOfBuurtPolygonProperties>
    {
        public string BuurtCode { get; set; }
        public string BuurtNaam { get; set; }
        public string WijkCode { get; set; }
        public string GemeenteCode { get; set; }
        public string GemeenteNaam { get; set; }
    }
}
