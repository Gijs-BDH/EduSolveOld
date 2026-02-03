namespace BDH.Shared.Domain.Geometry.Extensions
{
    public class BoundingBox2D
    {
        private readonly Point2D min;
        private readonly Point2D max;

        public BoundingBox2D(Polygon polygon)
        {
            min = polygon.BoundingBoxMinimum;
            max = polygon.BoundingBoxMaximum;
        }
        public BoundingBox2D(params Point2D[] points)
        {
            min = new Point2D(points.Min((Point2D p) => p.X), points.Min((Point2D p) => p.Y));
            max = new Point2D(points.Max((Point2D p) => p.X), points.Max((Point2D p) => p.Y));
        }

        public Point2D Min => min;
        public Point2D Max => max;
    }
}