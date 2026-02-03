namespace BDH.Rhino.Web.API.Domain.Solvers.Tile.Models
{
    public class TileDesign
    {
        public IList<CatalogLineOnTile> Lines { get; }
        public int UsedSeed { get; }

        public TileDesign(IList<CatalogLineOnTile> lines, int usedSeed)
        {
            Lines = lines;
            UsedSeed = usedSeed;
        }
    }
}
