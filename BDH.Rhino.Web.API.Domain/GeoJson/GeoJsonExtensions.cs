namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public static class GeoJsonExtensions
    {
        public static void GetBoundingBox(this PolygonGeometryJson geoJson, out decimal minx, out decimal miny, out decimal maxx, out decimal maxy)
        {
            minx = decimal.MaxValue;
            maxx = decimal.MinValue;
            miny = decimal.MaxValue;
            maxy = decimal.MinValue;

            if (!geoJson.Coordinates.SelectMany(c => c.SelectMany(_c => _c)).Any())
            {
                throw new Exception("No points in polygon");
            }

            foreach (var shape in geoJson.Coordinates)
            {
                foreach (var couple in shape)
                {
                    var x = couple.ElementAt(0);
                    var y = couple.ElementAt(1);

                    minx = Math.Min(minx, x);
                    maxx = Math.Max(maxx, x);
                    miny = Math.Min(miny, y);
                    maxy = Math.Max(maxy, y);
                }
            }
        }

        public static void GetCenter(this PolygonGeometryJson geoJson, out decimal latitude, out decimal longitude)
        {
            latitude = 0;
            longitude = 0;

            var pointsCounted = 0;

            foreach (var shape in geoJson.Coordinates)
            {
                foreach (var couple in shape)
                {
                    latitude += couple.ElementAt(1);
                    longitude += couple.ElementAt(0);

                    pointsCounted++;
                }
            }

            if (pointsCounted == 0)
            {
                throw new Exception("No points in polygon");
            }

            latitude /= pointsCounted;
            longitude /= pointsCounted;
        }

        public static double GetArea(this PolygonGeometryJson geoJson)
        {
            var mapPoints = new List<MapPoint>();

            foreach (var shape in geoJson.Coordinates)
            {
                foreach (var point in shape)
                {
                    var mapPoint = new MapPoint()
                    {
                        Latitude = (double)point.ElementAt(1),
                        Longitude = (double)point.ElementAt(0)
                    };

                    mapPoints.Add(mapPoint);
                }
            }

            return CalculatePolygonArea(mapPoints);
        }

        public static bool Includes(this PolygonGeometryJson geometry, MapPoint latLong)
        {
            var result = false;

            var polygon = geometry.Coordinates
                .First()
                .Select(couple => new { X = couple.ElementAt(1), Y = couple.ElementAt(0) })
                .ToList();

            var j = polygon.Count - 1;

            var testPoint = new { X = (decimal)latLong.Latitude, Y = (decimal)latLong.Longitude };

            for (int i = 0; i < polygon.Count; i++)
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

        public static double CalculatePolygonArea(IList<MapPoint> coordinates)
        {
            double area = 0;

            if (coordinates.Count > 2)
            {
                for (var i = 0; i < coordinates.Count - 1; i++)
                {
                    MapPoint p1 = coordinates[i];
                    MapPoint p2 = coordinates[i + 1];

                    area += ConvertToRadian(p2.Longitude - p1.Longitude) * (2 + Math.Sin(ConvertToRadian(p1.Latitude)) + Math.Sin(ConvertToRadian(p2.Latitude)));
                }

                area = area * 6378137 * 6378137 / 2;
            }

            return Math.Abs(area);
        }

        public static double ConvertToRadian(double input)
        {
            return input * Math.PI / 180;
        }
    }
}
