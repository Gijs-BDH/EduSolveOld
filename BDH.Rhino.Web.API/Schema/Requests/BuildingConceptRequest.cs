namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class BuildingConceptRequest
    {

        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;

        public decimal BvoPerUnit { get; set; }
        public decimal M3PerUnit { get; set; }
        public int WoningenPerUnit { get; set; }
        public decimal ProductieKostenPerUnit { get; set; }
        public decimal BouwkostenPerBvo { get; set; }
        public decimal MeerprijsEpc { get; set; }
        public decimal MeerprijsBeng { get; set; }


        public bool IsPrivate { get; set; }
        public bool Stapelbaar { get; set; }

        public BuildingConceptRequest()
        {

        }
    }


}
