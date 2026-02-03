using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class AanloopEnAfzetKosten
    {
        private readonly IBijkomendeKostenProvider bijkomendeKosten;
        private readonly decimal bouwkosten;



        public decimal Brochures =>
            bijkomendeKosten.Brochures / 100 * bouwkosten;
        public decimal Bemiddling =>
            bijkomendeKosten.Bemiddling / 100 * bouwkosten;
        public decimal Notaris =>
            bijkomendeKosten.Notaris / 100 * bouwkosten;


        public AanloopEnAfzetKosten(decimal bouwkosten, IBijkomendeKostenProvider bijkomendeKosten)
        {
            this.bouwkosten = bouwkosten;
            this.bijkomendeKosten = bijkomendeKosten;
        }
    }
}
