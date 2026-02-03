namespace BDH.Rhino.Web.API.Schema.Responses;

public class BriefBuilderBuildingGroupResponse
{
    public BriefBuilderBuildingGroupResponse()
    {
        ConnectedTo = new List<string>();
    }

    public string Name { get; set; } = string.Empty;

    public int BVO { get; set; }

    public string Color { get; set; }

    public int LowestLevel { get; set; }

    public int HighestLevel { get; set; }

    public int LevelHeight { get; set; }

    public ICollection<string> ConnectedTo { get; set; }
}