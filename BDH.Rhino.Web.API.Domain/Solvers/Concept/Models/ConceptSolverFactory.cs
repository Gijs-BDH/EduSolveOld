using BDH.Rhino.Web.API.Domain.Solvers.Concept.Private;

namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Models
{
    public class ConceptSolverFactory : IConceptSolverFactory
    {
        public IConceptConfiguratieSolver Create()
        {
            return new NaiveConceptSolver();
        }
    }
}
