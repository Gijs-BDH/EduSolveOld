using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using BDH.Rhino.Web.API.Schema.Data;
using Newtonsoft.Json;

namespace BDH.Rhino.Web.API.Proxy.Private
{

    public class Point2dCollectionSerializer : IPoint2dCollectionSerializer
    {
        private readonly IPoint2dFactory pointFactory;

        public Point2dCollectionSerializer(IPoint2dFactory pointFactory)
        {
            this.pointFactory = pointFactory;
        }

        public ICollection<IXY> FromString(string value)
        {
            var json = JsonConvert.DeserializeObject<ICollection<Point2dData>>(value);
            return json!.Select(v => pointFactory.Point2D(v.X, v.Y)).ToArray();
        }

        public string ToString(ICollection<IXY> geometry)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(geometry.Select(v => new Point2dData() { X = v.X, Y = v.Y }).ToArray());
            return json;
        }
    }
}
