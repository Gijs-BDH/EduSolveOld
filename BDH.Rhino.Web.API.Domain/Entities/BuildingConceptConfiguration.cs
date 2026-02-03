namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConceptConfiguration
    {
        public Guid Id { get; set; }
        public BuildingConcept For { get; set; } = null!;

        public bool LeftIsIndifferent { get; set; } = true;
        public bool EmptySpaceAllowedLeft { get; set; }
        public ICollection<Guid> AllowedLeft { get; set; } = null!;

        public bool RightIsIndifferent { get; set; } = true;
        public bool EmptySpaceAllowedRight { get; set; }
        public ICollection<Guid> AllowedRight { get; set; } = null!;

        public bool AboveIsIndifferent { get; set; } = true;
        public bool EmptySpaceAllowedAbove { get; set; }
        public ICollection<Guid> AllowedAbove { get; set; } = null!;

        public bool BelowIsIndifferent { get; set; } = true;
        public bool AllowedOnLowestLevel { get; set; }
        public ICollection<Guid> AllowedBelow { get; set; } = null!;


        public int ColumnSpan { get; set; } = 1;
        public int RowSpan { get; set; } = 1;
    }
}
