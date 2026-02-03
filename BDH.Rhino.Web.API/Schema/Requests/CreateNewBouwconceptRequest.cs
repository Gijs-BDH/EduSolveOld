namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class CreateNewBouwconceptRequest
    {
        public string Name { get; set; } = null!;
        public Guid CatalogId { get; set; }
        public decimal BvoPerUnit { get; set; }
        public decimal M3PerUnit { get; set; }
        public int WoningenPerUnit { get; set; }
        public decimal ProductieKostenPerUnit { get; set; }
        public decimal MeerprijsEpc { get; set; }
        public decimal MeerprijsBeng { get; set; }
        public double GlazingFactor { get; set; }
        public bool IsPrivate { get; set; }
        public bool Stapelbaar { get; set; }
        public double Width { get; set; }
        public double Depth { get; set; }
        public double Height { get; set; }
    }

}
