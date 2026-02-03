namespace BDH.Rhino.Web.API.Domain.GeoJson
{

    public class MultiPolygonGeometryJson : BaseSerializable<MultiPolygonGeometryJson>
    {
        public string Type { get; set; }

        public ICollection<ICollection<ICollection<ICollection<decimal>>>> Coordinates { get; set; }


        public bool PointInPolygon(decimal latitude, decimal longitude)
        {
            var testPoint = new XY(latitude, longitude);

            foreach (var shape in Coordinates)
            {
                foreach (var polygon in shape)
                {
                    var polygonPoints = new List<XY>();

                    foreach (var couple in polygon)
                    {
                        var _lat = couple.ElementAt(1);
                        var _long = couple.ElementAt(0);

                        polygonPoints.Add(new XY(_lat, _long));
                    }

                    if (IsPointInPolygon4(polygonPoints.ToArray(), testPoint))
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public static bool IsPointInPolygon4(XY[] polygon, XY testPoint)
        {
            var result = false;

            if (polygon.Length < 3)
            {
                return result;
            }

            var j = polygon.Length - 1;

            for (var i = 0; i < polygon.Length; i++)
            {
                if (polygon[i].Y < testPoint.Y && polygon[j].Y >= testPoint.Y || polygon[j].Y < testPoint.Y && polygon[i].Y >= testPoint.Y)
                {
                    if (polygon[i].X + (testPoint.Y - polygon[i].Y) / (polygon[j].Y - polygon[i].Y) * (polygon[j].X - polygon[i].X) < testPoint.X)
                    {
                        result = !result;
                    }
                }

                j = i;
            }

            return result;
        }

        public class XY
        {
            public decimal X { get; }
            public decimal Y { get; }

            public XY(decimal x, decimal y)
            {
                X = x;
                Y = y;
            }
        }
    }
}
