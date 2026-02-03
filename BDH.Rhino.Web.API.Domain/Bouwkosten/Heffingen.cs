using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class Heffingen
    {
        private readonly IBijkomendeKostenProvider bijkomendeKosten;
        private readonly decimal bouwkosten;


        public decimal Leges =>
            bijkomendeKosten.Leges / 100 * bouwkosten;
        public decimal Verzekeringen =>
            bijkomendeKosten.Verzekeringen / 100 * bouwkosten;


        public Heffingen(decimal bouwkosten, IBijkomendeKostenProvider bijkomendeKosten)
        {
            this.bouwkosten = bouwkosten;
            this.bijkomendeKosten = bijkomendeKosten;
        }
    }
}
