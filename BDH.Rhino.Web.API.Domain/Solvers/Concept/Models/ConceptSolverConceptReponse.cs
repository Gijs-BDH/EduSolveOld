using BDH.Rhino.Web.API.Domain.Entities;
using Newtonsoft.Json;

namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Models
{
    public class ConceptSolverConceptReponse
    {
        [JsonIgnore]
        public BuildingConcept Bouwconcept { get; set; } = null!;
        public Guid Id => Bouwconcept.Id;
        public int ColumnSpan { get; set; } = 1;
        public int RowSpan { get; set; } = 1;


        public ConceptSolverConceptReponse()
        {

        }
    }
}
