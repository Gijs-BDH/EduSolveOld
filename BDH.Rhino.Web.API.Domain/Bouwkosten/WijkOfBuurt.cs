using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;

namespace BDH.Rhino.Web.Domain.Interfaces
{
    public class WijkOfBuurt
    {
        public static WijkOfBuurt Unknown { get; } = new WijkOfBuurt("Uknown", "Unknown", null!);

        public string Name { get; } = null!;
        public string Code { get; } = null!;
        public MultiPolygonJson<WijkOfBuurtPolygonProperties>? Polygon { get; }

        public WijkOfBuurt(string name, string code, MultiPolygonJson<WijkOfBuurtPolygonProperties> polygon)
        {
            Name = name;
            Code = code;
            Polygon = polygon;
        }
    }
}
