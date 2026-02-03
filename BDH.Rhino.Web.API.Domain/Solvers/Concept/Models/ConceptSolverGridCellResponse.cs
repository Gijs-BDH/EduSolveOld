namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Models
{
    public class ConceptSolverGridCellResponse
    {
        public ConceptSolverConceptReponse OccupiedBy { get; set; } = null!;
        public ConceptSolverConceptReponse? OriginFor { get; set; }
    }
}
