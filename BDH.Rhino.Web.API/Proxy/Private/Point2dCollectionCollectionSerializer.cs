using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using BDH.Rhino.Web.API.Schema.Data;
using Newtonsoft.Json;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class Point2dCollectionCollectionSerializer : IPolylineCollectionSerializer
    {
        private readonly IPoint2dFactory geometry;

        public Point2dCollectionCollectionSerializer(IPoint2dFactory geometry)
        {
            this.geometry = geometry;
        }

        public ICollection<ICollection<IPoint2d>> FromString(string value)
        {
            var json = JsonConvert.DeserializeObject<ICollection<ICollection<Point2dData>>>(value);

            var collection = new List<ICollection<IPoint2d>>();
            foreach (var list in json!)
            {
                var _collection = new List<IPoint2d>();
                foreach (var point in list)
                {
                    _collection.Add(geometry.Point2D(point.X, point.Y));
                }
                collection.Add(_collection);
            }

            return collection;
        }

        public string ToString(ICollection<ICollection<IPoint2d>> geometry)
        {
            var json = JsonConvert.SerializeObject(geometry);
            return json;
        }
    }
}
