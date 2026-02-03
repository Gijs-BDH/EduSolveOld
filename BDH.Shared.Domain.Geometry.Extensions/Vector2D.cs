namespace BDH.Shared.Domain.Geometry.Extensions
{
    public class Vector2D
    {
        private readonly Point2D point;

        public double X => point.X;
        public double Y => point.Y;
        public double Length => point.Length;


        public Vector2D(Point2D point)
        {
            this.point = point;
        }

        public Vector2D(double x, double y)
        {
            this.point = new Point2D(x, y);
        }



        public double CrossProduct(Vector2D other)
        {
            return (X * other.Y) - (Y * other.X);
        }
        public double DotProduct(Vector2D other)
        {
            return (X * other.X) + (Y * other.Y);
        }


        public Vector2D Reverse()
        {
            return new Vector2D(new Point2D(-X, -Y));
        }
        public Vector2D Normalize()
        {
            return new Vector2D(new Point2D(X / Length, Y / Length));
        }
        public Vector2D Multiply(double length)
        {
            return new Vector2D(new Point2D(X * length, Y * length));
        }
        public Vector2D Rotate(double angle)
        {
            var point = new Point2D(X, Y);
            var anchor = new Point2D(0, 0);
            var rotated = point.RotateAround(anchor, angle);
            return new Vector2D(rotated);
        }
        public double AngleTo(Vector2D vector2)
        {
            double sin = X * vector2.Y - vector2.X * Y;
            double cos = X * vector2.X + Y * vector2.Y;

            return Math.Atan2(sin, cos) * (180 / Math.PI);
        }
    }
}