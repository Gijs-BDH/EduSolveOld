using BDH.Rhino.Web.API.Domain.Bouwkosten;
using BDH.Rhino.Web.API.Domain.Interfaces;
using BDH.Rhino.Web.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Utilities
{
    public class BouwkostenUtility : ICheckProjectHealth
    {
        private readonly ITypologieKostenModelProvider kostenModelProvider;
        private readonly IBijkomendeKostenProvider bijkomendeKostenProvider;

        public BouwkostenUtility(ITypologieKostenModelProvider kostenModelProvider, IBijkomendeKostenProvider bijkomendeKostenProvider)
        {
            this.kostenModelProvider = kostenModelProvider;
            this.bijkomendeKostenProvider = bijkomendeKostenProvider;
        }

        public ITypologieKostenModelProvider KostenModelProvider => kostenModelProvider;

        public BouwkostenSummary CreateBouwkostenSummary(ICollection<TypologyInputByUnits> bouwkostenRequestModel)
        {
            var summaries = new List<BouwkostenForTypologySummary>();

            foreach (var typologie in bouwkostenRequestModel)
            {
                var found = KostenModelProvider.Request(typologie.Typologie, out var typologieInformatie);
                if (!found)
                {
                    continue;
                }

                var summary = summaries.FirstOrDefault(s => s.Name == typologie.Typologie);

                if (summary is null)
                {
                    summary = new BouwkostenForTypologySummary(
                        typologieInformatie!.Name,
                        typologieInformatie.WoningenPerUnit,
                        typologieInformatie.BvoPerUnit,
                        typologieInformatie.BasisKostenPerM2BVO,
                        typologieInformatie.MeerprijsEpcPerM2BVO,
                        typologieInformatie.MeerprijsBengPerM2BVO,
                        typologieInformatie.IsUserProvided);

                    summaries.Add(summary);
                }

                summary.Units += typologie.Stuks;
            }

            return new BouwkostenSummary(summaries, bijkomendeKostenProvider);
        }
    }
}
