using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class BijkomendeKostenDTO : IBijkomendeKostenProvider
    {
        public decimal Architect { get; set; }
        public decimal Stedenbouwkundige { get; set; }
        public decimal Interieur { get; set; }
        public decimal Constructeur { get; set; }
        public decimal AdviseurInstallaties { get; set; }
        public decimal Bouwfysica { get; set; }
        public decimal ProjectManagement { get; set; }
        public decimal KostenManagement { get; set; }
        public decimal Toezicht { get; set; }
        public decimal OverigeAdviseurs { get; set; }


        public decimal Leges { get; set; }
        public decimal Verzekeringen { get; set; }


        public decimal Brochures { get; set; }
        public decimal Bemiddling { get; set; }
        public decimal Notaris { get; set; }


        public decimal FinancieringHuur { get; set; }
        public decimal FinancieringKoop { get; set; }
        public decimal PeildatumVerschuiving { get; set; }


        public decimal AlgemeneKosten { get; set; }
        public decimal WinstEnRisico { get; set; }


        public static BijkomendeKostenDTO FromOther(IBijkomendeKostenProvider other)
        {
            return new BijkomendeKostenDTO()
            {
                Architect = other.Architect,
                Stedenbouwkundige = other.Stedenbouwkundige,
                Interieur = other.Interieur,
                Constructeur = other.Constructeur,
                AdviseurInstallaties = other.AdviseurInstallaties,
                Bouwfysica = other.Bouwfysica,
                ProjectManagement = other.ProjectManagement,
                KostenManagement = other.KostenManagement,
                Toezicht = other.Toezicht,
                OverigeAdviseurs = other.OverigeAdviseurs,
                Leges = other.Leges,
                Verzekeringen = other.Verzekeringen,
                Brochures = other.Brochures,
                Bemiddling = other.Bemiddling,
                Notaris = other.Notaris,
                FinancieringHuur = other.FinancieringHuur,
                FinancieringKoop = other.FinancieringKoop,
                PeildatumVerschuiving = other.PeildatumVerschuiving,
                AlgemeneKosten = other.AlgemeneKosten,
                WinstEnRisico = other.WinstEnRisico
            };
        }
    }
}
