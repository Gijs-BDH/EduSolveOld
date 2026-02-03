using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class Financiering
    {
        private readonly IBijkomendeKostenProvider bijkomendeKosten;
        private readonly decimal bouwkosten;




        public decimal FinancieringHuur => bijkomendeKosten.FinancieringHuur / 100 * bouwkosten;
        public decimal FinancieringKoop => bijkomendeKosten.FinancieringKoop / 100 * bouwkosten;
        public decimal PeildatumVerschuiving => bijkomendeKosten.PeildatumVerschuiving / 100 * bouwkosten;

        public Financiering(decimal bouwkosten, IBijkomendeKostenProvider bijkomendeKosten)
        {
            this.bouwkosten = bouwkosten;
            this.bijkomendeKosten = bijkomendeKosten;
        }
    }
}
