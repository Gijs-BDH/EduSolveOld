namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class HeffingenViewModel
    {
        public decimal Leges { get; set; }
        public decimal Verzekeringen { get; set; }

        public HeffingenViewModel()
        {

        }
        public HeffingenViewModel(Heffingen heffingen) : this()
        {
            Leges = heffingen.Leges;
            Verzekeringen = heffingen.Verzekeringen;
        }
    }
}
