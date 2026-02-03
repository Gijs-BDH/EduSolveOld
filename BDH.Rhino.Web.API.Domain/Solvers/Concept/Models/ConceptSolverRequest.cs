using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Models
{
    public class ConceptSolverRequest
    {
        public ConceptSolverRequest(ICollection<BuildingConceptConfiguration> concepts, int width, int heightFrom, int heightTo, int? allowedColumnsFrom, int? allowedColumnsTo, int? allowedRowsFrom, int? allowedRowsTo)
        {
            Concepts = concepts;
            Width = width;
            HeightFrom = heightFrom;
            HeightTo = heightTo;
            AllowedColumnsFrom = allowedColumnsFrom;
            AllowedColumnsTo = allowedColumnsTo;
            AllowedRowsFrom = allowedRowsFrom;
            AllowedRowsTo = allowedRowsTo;
        }



        public ICollection<BuildingConceptConfiguration> Concepts { get; } = null!;
        public int Width { get; set; }
        public int HeightFrom { get; }
        public int HeightTo { get; }
        public int? AllowedColumnsFrom { get; }
        public int? AllowedColumnsTo { get; }
        public int? AllowedRowsFrom { get; }
        public int? AllowedRowsTo { get; }
    }
}
