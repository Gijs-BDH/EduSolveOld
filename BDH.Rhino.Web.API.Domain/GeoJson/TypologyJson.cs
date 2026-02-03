namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class TypologyJson : BaseSerializable<TypologyJson>
    {
        public string Name { get; set; }
        public decimal BvoPerUnit { get; set; }
        public decimal VolumePerUnit { get; set; }
    }
}
