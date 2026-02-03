using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class BouwkostenSummary
    {
        public IEnumerable<BouwkostenForTypologySummary> Typologies { get; }



        public decimal Bouwkosten =>
            Typologies.Select(t => t.KostenBouw).Sum();
        public decimal KostenBeng =>
            Typologies.Select(t => t.KostenBeng).Sum();
        public decimal KostenEpc =>
            Typologies.Select(t => t.KostenEpc).Sum();
        public decimal TotaleKosten =>
            Bouwkosten + KostenBeng + KostenEpc;



        public IBijkomendeKostenProvider KostenVerdeling { get; }



        public Honoratia Honoratia =>
            new(Bouwkosten, KostenVerdeling);
        public Heffingen Heffingen =>
            new(Bouwkosten, KostenVerdeling);
        public AanloopEnAfzetKosten AanloopEnAfzet =>
            new(Bouwkosten, KostenVerdeling);
        public Financiering Financiering =>
            new(Bouwkosten, KostenVerdeling);
        public ProjectOntwikkeling ProjectOntwikkeling =>
            new(Bouwkosten, KostenVerdeling);



        public BouwkostenSummary(ICollection<BouwkostenForTypologySummary> typologies, IBijkomendeKostenProvider bijkomendeKosten)
        {
            KostenVerdeling = bijkomendeKosten;

            Typologies = typologies;
        }
    }


}
