namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class BoxTransform : BaseSerializable<BoxTransform>
    {
        public TransformJson Transform { get; set; }
        public TypologyJson Typology { get; set; }
    }
}
