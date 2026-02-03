namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class AanloopEnAfzetKostenViewModel
    {
        public decimal Brochures { get; set; }
        public decimal Bemiddling { get; set; }
        public decimal Notaris { get; set; }

        public AanloopEnAfzetKostenViewModel()
        {

        }
        public AanloopEnAfzetKostenViewModel(AanloopEnAfzetKosten aanloopEnAfzetKosten) : this()
        {
            Brochures = aanloopEnAfzetKosten.Brochures;
            Bemiddling = aanloopEnAfzetKosten.Bemiddling;
            Notaris = aanloopEnAfzetKosten.Notaris;
        }
    }
}
