using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class TileDesignRequest
    {
        public TileDesignRequest(IPolygon2d tile, IEnumerable<ILine2d> lines, Guid catalogId, double minimumLineLength, double lineMargine, double deflation)
        {
            Tile = tile;
            Lines = lines;
            CatalogId = catalogId;
            MinimumLineLength = minimumLineLength;
            LineMargin = lineMargine;
            Deflation = deflation;
        }

        public IPolygon2d Tile { get; }
        public IEnumerable<ILine2d> Lines { get; }
        public Guid CatalogId { get; }
        public double MinimumLineLength { get; }
        public double LineMargin { get; }
        public double Deflation { get; }
    }
}
