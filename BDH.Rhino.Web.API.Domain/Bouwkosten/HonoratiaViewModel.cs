
namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class HonoratiaViewModel
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

        public HonoratiaViewModel()
        {

        }
        public HonoratiaViewModel(Honoratia honoratia) : this()
        {
            Architect = honoratia.Architect;
            Stedenbouwkundige = honoratia.Stedenbouwkundige;
            Interieur = honoratia.Interieur;
            Constructeur = honoratia.Constructeur;
            AdviseurInstallaties = honoratia.AdviseurInstallaties;
            Bouwfysica = honoratia.Bouwfysica;
            ProjectManagement = honoratia.ProjectManagement;
            KostenManagement = honoratia.KostenManagement;
            Toezicht = honoratia.Toezicht;
            OverigeAdviseurs = honoratia.OverigeAdviseurs;
        }
    }
}
