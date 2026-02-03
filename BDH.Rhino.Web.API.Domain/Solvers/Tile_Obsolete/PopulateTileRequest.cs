using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;
using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Models
{
    public class PopulateTileRequest
    {
        public PolygonJson<GenerativeDesignTileProperties> Tile { get; set; } = null!;

        public IBoundingBox3d ModelDimensions { get; set; } = null!;

    }
}
