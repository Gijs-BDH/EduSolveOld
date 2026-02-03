using BDH.Rhino.Web.API.Domain.Bouwkosten;

namespace BDH.Rhino.Web.Domain.Interfaces
{
    public interface ICheckProjectHealth
    {
        BouwkostenSummary CreateBouwkostenSummary(ICollection<TypologyInputByUnits> bouwkostenRequestModel);
    }
}
