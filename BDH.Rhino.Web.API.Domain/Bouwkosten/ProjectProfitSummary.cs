namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class ProjectProfitSummary
    {
        public IEnumerable<TypologyProfitSummary> ProfitByTypology { get; } = new List<TypologyProfitSummary>();

        public ProjectProfitSummary(IEnumerable<TypologyProfitSummary> profitByTypology)
        {
            ProfitByTypology = profitByTypology;
        }
    }


}
