namespace BDH.Rhino.Web.API.Schema.Responses;

public class BriefBuilderProjectResponse
{
    public BriefBuilderProjectResponse()
    {
        BuildingGroups = new List<BriefBuilderBuildingGroupResponse>();
        Connections = new List<BriefBuilderBuildingGroupConnectionResponse>();
    }

    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string BVOFactor { get; set; } = string.Empty;

    public ICollection<BriefBuilderBuildingGroupResponse> BuildingGroups { get; set; }

    public ICollection<BriefBuilderBuildingGroupConnectionResponse> Connections { get; set; }
}
