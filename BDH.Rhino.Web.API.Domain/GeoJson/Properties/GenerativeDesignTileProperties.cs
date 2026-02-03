namespace BDH.Rhino.Web.API.Domain.GeoJson.Properties
{
    public class GenerativeDesignTileProperties : BaseSerializable<GenerativeDesignTileProperties>
    {
        // public ICollection<ICollection<decimal>> LocalPoints { get; set; } = new List<ICollection<decimal>>();
        public string BouwConcept { get; set; }
        public string Bestemming { get; set; }
        public string BouwStrategie { get; set; }
        //public bool AutoGenerate { get; set; }
        //public string PathToAssetFile { get; set; }
        public decimal TuinDiepte { get; set; }
        public decimal StoepBreedte { get; set; }
        public int Woningen { get; set; }
    }
}
