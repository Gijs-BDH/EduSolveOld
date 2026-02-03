using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class ProjectOntwikkeling
    {
        private readonly IBijkomendeKostenProvider bijkomendeKosten;
        private readonly decimal bouwkosten;


        public decimal AlgemeneKosten => bijkomendeKosten.AlgemeneKosten / 100 * bouwkosten;
        public decimal WinstEnRisico => bijkomendeKosten.WinstEnRisico / 100 * bouwkosten;

        public ProjectOntwikkeling(decimal bouwkosten, IBijkomendeKostenProvider bijkomendeKosten)
        {
            this.bouwkosten = bouwkosten;
            this.bijkomendeKosten = bijkomendeKosten;
        }
    }
}
