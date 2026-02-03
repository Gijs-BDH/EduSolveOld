using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Solvers.Concept
{
    public class ConceptSolverGridCell
    {
        public BuildingConceptConfiguration? OccupiedBy { get; set; }
        public BuildingConceptConfiguration? OriginFor { get; set; }

        public ConceptSolverGridCell()
        {

        }
    }
}
