using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using BDH.Rhino.Web.API.Proxy.Private;
using BDH.Shared.Domain.Geometry;
using BDH.Shared.Domain.Geometry.Extensions;

namespace BDH.Rhino.Web.API.Proxy
{
    /// <summary>
    /// Only public to test
    /// </summary>
    public class Geometry : IGeometry
    {
        private readonly ILine2dFactory lineFactory;
        private readonly IPoint2dFactory pointFactory;
        private readonly IPoint3dFactory point3DFactory;
        private readonly IPolygon2dFactory polygonFactory;
        private readonly IVector2dFactory vector2DFactory;
        private readonly IVector3dFactory vector3DFactory;
        private readonly IPoint2dCollectionSerializer point2DCollectionSerializer;
        private readonly IPolylineCollectionSerializer polylineCollectionSerializer;

        public IPolylineCollectionSerializer PolylineCollectionSerializer => polylineCollectionSerializer;
        public IPoint2dCollectionSerializer PointCollectionSerializer => point2DCollectionSerializer;

        public Geometry(
            ILine2dFactory lineFactory,
            IPoint2dFactory pointFactory,
            IPoint3dFactory point3DFactory,
            IPolygon2dFactory polygonFactory,
            IVector2dFactory vector2DFactory,
            IVector3dFactory vector3DFactory,
            IPoint2dCollectionSerializer point2DCollectionSerializer,
            IPolylineCollectionSerializer polylineCollectionSerializer)
        {
            this.lineFactory = lineFactory;
            this.pointFactory = pointFactory;
            this.point3DFactory = point3DFactory;
            this.polygonFactory = polygonFactory;
            this.vector2DFactory = vector2DFactory;
            this.vector3DFactory = vector3DFactory;
            this.point2DCollectionSerializer = point2DCollectionSerializer;
            this.polylineCollectionSerializer = polylineCollectionSerializer;
        }

        public static IGeometry CreateDefault()
        {
            var lineFactory = new BdhLine2dFactory();
            var pointFactory = new BdhPoint2dFactory();
            var point3dFactory = new BdhPoint3dFactory();
            var polygonFactory = new BdhPolygon2dFactory();
            var vector2dFactory = new BdhVector2dFactory();
            var vector3dFactory = new BdhVector3dFactory();
            var pointcollectionSerializer = new Point2dCollectionSerializer(pointFactory);
            var polylineCollectionSerializer = new Point2dCollectionCollectionSerializer(pointFactory);
            return new Geometry(lineFactory, pointFactory, point3dFactory, polygonFactory, vector2dFactory, vector3dFactory, pointcollectionSerializer, polylineCollectionSerializer);
        }

        public IPolygon2d Polygon(IEnumerable<IXY> points)
        {
            return polygonFactory.Polygon(points);
        }

        public ILine2d Line(IXY start, IXY end)
        {
            return lineFactory.Line(start, end);
        }

        public IPoint2d Point2D(double x, double y)
        {
            return pointFactory.Point2D(x, y);
        }

        public IPoint3d Point3D(double x, double y, double z)
        {
            return point3DFactory.Point3D(x, y, z);
        }

        public IEnumerable<ILine2d> Connect(IEnumerable<IPoint2d> points)
        {
            return points
                .Select(p => new Point2D(p.X, p.Y))
                .Connect()
                .Select(l => l.T());
        }

        public IEnumerable<IPolygon2d> Union(IEnumerable<IPolygon2d> polygons)
        {
            return polygons.Select(p => p.T()).Union().Select(p => p.T());
        }

        public IVector2d Vector2D(double x, double y)
        {
            return vector2DFactory.Vector2D(x, y);
        }

        public IVector3d Vector3D(double x, double y, double z)
        {
            return vector3DFactory.Vector3D(x, y, z);
        }
    }
}
