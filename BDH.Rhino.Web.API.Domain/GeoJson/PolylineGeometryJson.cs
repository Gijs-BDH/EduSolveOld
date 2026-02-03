namespace BDH.Rhino.Web.API.Domain.GeoJson
{

    public class PolylineGeometryJson : BaseSerializable<PolygonGeometryJson>
    {
        public string Type { get; set; }

        public ICollection<ICollection<decimal>> Coordinates { get; set; }


        public void GetBoundingBox(out decimal minx, out decimal miny, out decimal maxx, out decimal maxy)
        {
            minx = decimal.MaxValue;
            maxx = decimal.MinValue;
            miny = decimal.MaxValue;
            maxy = decimal.MinValue;

            if (!Coordinates.SelectMany(c => c).Any())
            {
                throw new Exception("No points in polygon");
            }

            foreach (var shape in Coordinates)
            {
                var x = shape.ElementAt(0);
                var y = shape.ElementAt(1);

                minx = Math.Min(minx, x);
                maxx = Math.Max(maxx, x);
                miny = Math.Min(miny, y);
                maxy = Math.Max(maxy, y);
            }
        }
    }
}
