namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class PolygonGeometryJson : BaseSerializable<PolygonGeometryJson>
    {
        public string Type { get; set; }

        public ICollection<ICollection<ICollection<decimal>>> Coordinates { get; set; }


        public PolygonGeometryJson()
        {

        }


    }
}
