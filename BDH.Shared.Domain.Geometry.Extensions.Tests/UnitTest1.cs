namespace BDH.Shared.Domain.Geometry.Extensions.Tests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestIntersection()
        {
            var points = new List<Point2D>()
            {
                new Point2D(0, 0),
                new Point2D(0, 5),
                new Point2D(5, 5),
                new Point2D(5, 0)
            };
            var polygon = new Polygon(points);

            var secondPolygon = polygon.Translate(new Vector2D(2.5, 2.5));

            var intersection = new[] { polygon, secondPolygon }.Intersection();
            var difference = polygon.Difference(secondPolygon);
        }

        [TestMethod]
        public void TestInflate()
        {
            var line = new Line2D(
                new Point2D(0, 0),
                new Point2D(5, 5)
            );

            var flatPolygon = line.Thicken(3, false);
            var fullPolygon = line.Thicken(3, true);
            var expandedPolygon = fullPolygon.Inflate(3);
            var restoredPolygon = expandedPolygon.First().Deflate(3);
        }
    }
}