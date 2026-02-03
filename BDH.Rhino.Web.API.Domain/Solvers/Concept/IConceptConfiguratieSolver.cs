using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.Concept
{
    public interface IConceptConfiguratieSolver
    {
        ConceptSolverResponse Solve(ConceptSolverRequest request, int attmepts, Random random);
    }
}
