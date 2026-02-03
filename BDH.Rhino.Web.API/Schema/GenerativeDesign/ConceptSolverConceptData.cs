using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Schema.GenerativeDesign
{
    public class ConceptSolverConceptData
    {
        public string BouwconceptId { get; set; } = null!;


        public bool EmptySpaceAllowedLeft { get; set; }
        public bool LeftIsIndifferent { get; set; }
        public ICollection<string> AllowedLeft { get; set; } = null!;


        public bool RightIsIndifferent { get; set; }
        public bool EmptySpaceAllowedRight { get; set; }
        public ICollection<string> AllowedRight { get; set; } = null!;


        public bool AboveIsIndifferent { get; set; }
        public bool EmptySpaceAllowedAbove { get; set; }
        public ICollection<string> AllowedAbove { get; set; } = null!;


        public bool BelowIsIndifferent { get; set; }
        public bool AllowedOnLowestLevel { get; set; }
        public ICollection<string> AllowedBelow { get; set; } = null!;


        public int ColumnSpan { get; set; } = 1;
        public int RowSpan { get; set; } = 1;



        public ConceptSolverConceptData FromModel(BuildingConceptConfiguration model)
        {
            BouwconceptId = model.For.Id.ToString();

            EmptySpaceAllowedLeft = model.EmptySpaceAllowedLeft;
            LeftIsIndifferent = model.LeftIsIndifferent;
            AllowedLeft = model.AllowedLeft.Select(c => c.ToString()).ToArray();

            EmptySpaceAllowedRight = model.EmptySpaceAllowedRight;
            RightIsIndifferent = model.RightIsIndifferent;
            AllowedRight = model.AllowedRight.Select(c => c.ToString()).ToArray();

            AboveIsIndifferent = model.AboveIsIndifferent;
            EmptySpaceAllowedAbove = model.EmptySpaceAllowedAbove;
            AllowedAbove = model.AllowedAbove.Select(c => c.ToString()).ToArray();

            BelowIsIndifferent = model.BelowIsIndifferent;
            AllowedOnLowestLevel = model.AllowedOnLowestLevel;
            AllowedBelow = model.AllowedBelow.Select(c => c.ToString()).ToArray();

            ColumnSpan = model.ColumnSpan;
            RowSpan = model.RowSpan;

            return this;
        }


        public BuildingConceptConfiguration CopyTo(BuildingConceptConfiguration entity)
        {
            if (entity.For?.Id.ToString() != BouwconceptId)
            {
                throw new Exception();
            }

            entity.EmptySpaceAllowedLeft = EmptySpaceAllowedLeft;
            entity.LeftIsIndifferent = LeftIsIndifferent;
            entity.AllowedLeft = AllowedLeft.Select(c => new Guid(c)).ToArray();

            entity.EmptySpaceAllowedRight = EmptySpaceAllowedRight;
            entity.RightIsIndifferent = RightIsIndifferent;
            entity.AllowedRight = AllowedRight.Select(c => new Guid(c)).ToArray();

            entity.AboveIsIndifferent = AboveIsIndifferent;
            entity.EmptySpaceAllowedAbove = EmptySpaceAllowedAbove;
            entity.AllowedAbove = AllowedAbove.Select(c => new Guid(c)).ToArray();

            entity.BelowIsIndifferent = BelowIsIndifferent;
            entity.AllowedOnLowestLevel = AllowedOnLowestLevel;
            entity.AllowedBelow = AllowedBelow.Select(c => new Guid(c)).ToArray();

            entity.ColumnSpan = ColumnSpan;
            entity.RowSpan = RowSpan;

            return entity;
        }
    }
}
