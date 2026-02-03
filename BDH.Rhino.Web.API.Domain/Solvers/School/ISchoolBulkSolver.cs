using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School
{
    public interface ISchoolBulkSolver
    {
        IEnumerable<GeneratedSchoolResponse> Solve(GenerateSchoolRequest request, int solutions);
    }
}
