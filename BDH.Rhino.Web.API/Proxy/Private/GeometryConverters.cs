using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal static class GeometryConverters
    {
        public static ILine2d T(this Line2D line)
        {
            return new BdhLine2dProxy(line);
        }
        public static Line2D T(this ILine2d line)
        {
            return new Line2D(line.Start.T(), line.End.T());
        }



        public static IPoint2d T(this Point2D point)
        {
            return new BdhPoint2dProxy(point);
        }
        public static Point2D T(this IPoint2d point)
        {
            return new Point2D(point.X, point.Y);
        }



        public static IVector2d T(this Vector2D vector)
        {
            return new BdhVector2dProxy(vector);
        }
        public static Vector2D T(this IVector2d vector)
        {
            return new Vector2D(new Point2D(vector.X, vector.Y));
        }



        public static IPolygon2d T(this Polygon polygon)
        {
            return new BdhPolygon2dProxy(polygon);
        }
        public static Polygon T(this IPolygon2d polygon)
        {
            return new Polygon(polygon.EnumeratePoints().Select(p => p.T()));
        }



        public static IPoint3d T(this Point3DNew point)
        {
            return new BdhPoint3dProxy(point);
        }
        public static Point3DNew T(this IPoint3d point)
        {
            return new Point3DNew(point.X, point.Y, point.Z);
        }



        public static IVector3d T(this Vector3D vector)
        {
            return new BdhVector3dProxy(vector);
        }
        public static Vector3D T(this IVector3d vector)
        {
            return new Vector3D(vector.X, vector.Y, vector.Z);
        }
    }
}


