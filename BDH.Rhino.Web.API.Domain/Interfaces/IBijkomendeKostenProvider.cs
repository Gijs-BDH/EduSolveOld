namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface IBijkomendeKostenProvider
    {
        decimal Architect { get; }
        decimal Stedenbouwkundige { get; }
        decimal Interieur { get; }
        decimal Constructeur { get; }
        decimal AdviseurInstallaties { get; }
        decimal Bouwfysica { get; }
        decimal ProjectManagement { get; }
        decimal KostenManagement { get; }
        decimal Toezicht { get; }
        decimal OverigeAdviseurs { get; }


        decimal Leges { get; }
        decimal Verzekeringen { get; }


        decimal Brochures { get; }
        decimal Bemiddling { get; }
        decimal Notaris { get; }


        decimal FinancieringHuur { get; }
        decimal FinancieringKoop { get; }
        decimal PeildatumVerschuiving { get; }


        decimal AlgemeneKosten { get; }
        decimal WinstEnRisico { get; }
    }
}
