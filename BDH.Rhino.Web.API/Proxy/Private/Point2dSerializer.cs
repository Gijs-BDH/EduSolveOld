using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using BDH.Rhino.Web.API.Schema.Data;
using Newtonsoft.Json;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class Point2dSerializer : IPoint2dSerializer
    {
        private readonly IPoint2dFactory pointFactory;

        public Point2dSerializer(IPoint2dFactory pointFactory)
        {
            this.pointFactory = pointFactory;
        }

        public IPoint2d FromString(string value)
        {
            var json = JsonConvert.DeserializeObject<Point2dData>(value);
            return pointFactory.Point2D(json!.X, json.Y);
        }

        public string ToString(IPoint2d geometry)
        {
            return JsonConvert.SerializeObject(geometry);
        }
    }
}
