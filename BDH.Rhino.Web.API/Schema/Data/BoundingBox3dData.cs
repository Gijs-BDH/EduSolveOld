using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Schema.Data
{
    public class BoundingBox3dData : IBoundingBox3d
    {
        public double MinX { get; set; }
        public double MinY { get; set; }
        public double MinZ { get; set; }
        public double MaxX { get; set; }
        public double MaxY { get; set; }
        public double MaxZ { get; set; }
    }
}
