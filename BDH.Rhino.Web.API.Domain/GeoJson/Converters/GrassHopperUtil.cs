using System.Text;

namespace BDH.Rhino.Web.API.Domain.GeoJson.Converters
{
    public static class GrasshopperUtil
    {
        public static string ConvertToString(byte[] bytes) =>
            Encoding.Default.GetString(bytes);

        public static string ConvertToString<TProperties>(this IEnumerable<PolylineJson<TProperties>> polylines)
        {
            var result = "[" + string.Join(",", polylines.Select(l => l.SerializeToJSON())) + "]";

            return result;
        }
        public static string ConvertToString<TProperties>(this IEnumerable<PolygonJson<TProperties>> polygons)
        {
            var result = "[" + string.Join(",", polygons.Select(l => l.SerializeToJSON())) + "]";

            return result;
        }
        public static string ConvertToString(this IEnumerable<BoxTransform> boxes)
        {
            var result = "[" + string.Join(",", boxes.Select(l => l.SerializeToJSON())) + "]";

            return result;
        }
        public static string ConvertToString(this IEnumerable<UserAssetJson> assets)
        {
            var result = "[" + string.Join(",", assets.Select(l => l.SerializeToJSON())) + "]";

            return result;
        }

        public static PolygonJson<TProperties> ToPolygon<TProperties>(string json) =>
            new PolygonJson<TProperties>().Deserialize(json);

        public static UserAssetTransformCollection ToUserAssetTransformCollection(string json) =>
            new UserAssetTransformCollection().Deserialize(json);

        public static ICollection<PolygonJson<TProperties>> ToPolygonCollection<TProperties>(string json) =>
            new JsonCollection<PolygonJson<TProperties>>().Deserialize(json);

        public static ICollection<PolylineJson<TProperties>> ToPolylineCollection<TProperties>(string json) =>
            new JsonCollection<PolylineJson<TProperties>>().Deserialize(json);

        public static PolygonFeatureCollectionJson<TProperties> ToPolygonFeatureCollection<TProperties>(string json) =>
            new PolygonFeatureCollectionJson<TProperties>().Deserialize(json);

        public static MultiPolygonFeatureCollectionJson<TProperties> ToMultiPolygonFeatureCollection<TProperties>(string json) =>
            new MultiPolygonFeatureCollectionJson<TProperties>().Deserialize(json);

        public static ICollection<BoxTransform> ToTransformCollection(string json) =>
            new JsonCollection<BoxTransform>().Deserialize(json);

        public static ICollection<UserAssetJson> ToAssetCollection(string json) =>
            new JsonCollection<UserAssetJson>().Deserialize(json);

        public static ICollection<ICollection<decimal>> ToCoordinateCollection(string json) =>
            new JsonCollection<ICollection<decimal>>().Deserialize(json);
    }
}
