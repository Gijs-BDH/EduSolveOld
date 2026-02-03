namespace BDH.Rhino.Web.API.Schema.GenerativeDesign
{
    public class ConceptSolverRequestData
    {
        public ICollection<ConceptSolverConceptData> Concepts { get; set; } = null!;
        public int Width { get; set; }
        public int HeightFrom { get; set; }
        public int HeightTo { get; set; }
        public int? Seed { get; set; }
        public int? AllowedColumnsFrom { get; set; }
        public int? AllowedColumnsTo { get; set; }
        public int? AllowedRowsFrom { get; set; }
        public int? AllowedRowsTo { get; set; }
    }
}
