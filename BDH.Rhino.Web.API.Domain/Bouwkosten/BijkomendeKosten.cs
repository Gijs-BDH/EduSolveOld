using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class BijkomendeKosten : IBijkomendeKostenProvider
    {
        public decimal Architect { get; } = 4.8M;
        public decimal Stedenbouwkundige { get; } = 0.6M;
        public decimal Interieur { get; } = 0.2M;
        public decimal Constructeur { get; } = 1;
        public decimal AdviseurInstallaties { get; } = 1.5M;
        public decimal Bouwfysica { get; } = 1.1M;
        public decimal ProjectManagement { get; } = 2.1M;
        public decimal KostenManagement { get; } = 0.8M;
        public decimal Toezicht { get; } = 2M;
        public decimal OverigeAdviseurs { get; } = 1.5M;


        public decimal Leges { get; } = 5M;
        public decimal Verzekeringen { get; } = 1M;

        public decimal Brochures { get; } = 0.5M;
        public decimal Bemiddling { get; } = 1.2M;
        public decimal Notaris { get; } = 1.6M;

        public decimal FinancieringHuur { get; } = 6.8M;
        public decimal FinancieringKoop { get; } = 4.5M;
        public decimal PeildatumVerschuiving { get; } = 1.1M;

        public decimal AlgemeneKosten { get; } = 5M;
        public decimal WinstEnRisico { get; } = 10M;
    }
}
