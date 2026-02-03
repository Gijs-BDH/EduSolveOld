using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School
{
    public interface ISchoolFacadeBuilder
    {
        void Build(ref GeneratedSchoolResponse generatedSchool);
    }
}
