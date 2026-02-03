using BDH.Rhino.Web.API.Proxy.Private;
using BDH.Rhino.Web.API.Schema.Data;
using BDH.Rhino.Web.API.Schema.Requests;

namespace BDH.Rhino.Web.API.Schema.GenerativeDesign
{
    public class DesignTileRequestData
    {
        public int? Seed { get; set; }
        public ICollection<Point2dData> Tile { get; set; } = null!;
        public ICollection<Line2dData> Lines { get; set; } = null!;
        public Guid CatalogId { get; set; }
        public double MinimumLineLength { get; set; }
        public double LineMargin { get; set; }
        public double Deflation { get; set; }

        public TileDesignRequest ToRequest()
        {
            var polygonFactory = new BdhPolygon2dFactory();
            var polygon = polygonFactory.Polygon(Tile);
            var lines = Lines.Select(l => new BdhLine2dFactory().Line(l.Start, l.End));
            return new(polygon, lines, CatalogId, MinimumLineLength, LineMargin, Deflation);
        }
    }
}
