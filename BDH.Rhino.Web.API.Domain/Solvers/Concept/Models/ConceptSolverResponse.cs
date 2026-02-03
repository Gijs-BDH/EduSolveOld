namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Models
{
    public class ConceptSolverResponse
    {
        public IList<IList<ConceptSolverGridCellResponse>> Solution { get; set; } = null!;
    }
}
