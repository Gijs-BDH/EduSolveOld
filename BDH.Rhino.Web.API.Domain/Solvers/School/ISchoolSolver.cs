using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School
{
    public interface ISchoolSolver
    {
        GeneratedSchoolResponse Solve(GenerateSchoolRequest request);
    }
}
