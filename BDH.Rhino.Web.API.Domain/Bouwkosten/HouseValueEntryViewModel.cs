namespace BDH.Rhino.Web.Domain.Interfaces
{
    public class HouseValueEntryViewModel
    {
        public int ID { get; set; }
        public string RegioS { get; set; } = null!;
        public string Perioden { get; set; } = null!;
        public int GemiddeldeVerkoopprijs_1 { get; set; }
    }
}
