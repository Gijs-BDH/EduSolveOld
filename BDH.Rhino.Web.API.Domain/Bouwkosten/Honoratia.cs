using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class Honoratia
    {
        private readonly IBijkomendeKostenProvider bijkomendeKosten;
        private readonly decimal bouwkosten;

        public decimal Architect =>
            bijkomendeKosten.Architect / 100 * bouwkosten;
        public decimal Stedenbouwkundige =>
            bijkomendeKosten.Stedenbouwkundige / 100 * bouwkosten;
        public decimal Interieur =>
            bijkomendeKosten.Interieur / 100 * bouwkosten;
        public decimal Constructeur =>
            bijkomendeKosten.Constructeur / 100 * bouwkosten;
        public decimal AdviseurInstallaties =>
            bijkomendeKosten.AdviseurInstallaties / 100 * bouwkosten;
        public decimal Bouwfysica =>
            bijkomendeKosten.Bouwfysica / 100 * bouwkosten;
        public decimal ProjectManagement =>
            bijkomendeKosten.ProjectManagement / 100 * bouwkosten;
        public decimal KostenManagement =>
            bijkomendeKosten.KostenManagement / 100 * bouwkosten;
        public decimal Toezicht =>
            bijkomendeKosten.Toezicht / 100 * bouwkosten;
        public decimal OverigeAdviseurs =>
            bijkomendeKosten.Architect / 100 * bouwkosten;


        public Honoratia(decimal bouwkosten, IBijkomendeKostenProvider bijkomendeKosten)
        {
            this.bouwkosten = bouwkosten;
            this.bijkomendeKosten = bijkomendeKosten;
        }
    }
}
