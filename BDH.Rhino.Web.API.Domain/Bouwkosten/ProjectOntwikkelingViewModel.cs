namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class ProjectOntwikkelingViewModel
    {
        public decimal AlgemeneKosten { get; set; }
        public decimal WinstEnRisico { get; set; }

        public ProjectOntwikkelingViewModel()
        {

        }
        public ProjectOntwikkelingViewModel(ProjectOntwikkeling projectOntwikkeling) : this()
        {
            AlgemeneKosten = projectOntwikkeling.AlgemeneKosten;
            WinstEnRisico = projectOntwikkeling.WinstEnRisico;
        }
    }
}
