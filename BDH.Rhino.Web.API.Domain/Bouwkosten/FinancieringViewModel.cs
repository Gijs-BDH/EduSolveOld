namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class FinancieringViewModel
    {
        public decimal FinancieringHuur { get; set; }
        public decimal FinancieringKoop { get; set; }
        public decimal PeildatumVerschuiving { get; set; }

        public FinancieringViewModel()
        {

        }
        public FinancieringViewModel(Financiering financiering) : this()
        {
            FinancieringHuur = financiering.FinancieringHuur;
            FinancieringKoop = financiering.FinancieringKoop;
            PeildatumVerschuiving = financiering.PeildatumVerschuiving;
        }
    }
}
