namespace BDH.Rhino.Web.API.Domain.Solvers.Tile_Obsolete
{
    public class BuildingConceptTransformResponse
    {
        public string TypologyId { get; set; } = null!;
        public double LocationX { get; set; }
        public double LocationY { get; set; }
        public double Rotation { get; set; }
        public int Verdiepingen { get; set; }
    }
}
