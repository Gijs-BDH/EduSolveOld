namespace BDH.Rhino.Web.API.Schema.Responses;

public class BriefBuilderRequirementResponse
{
    public BriefBuilderRequirementResponse()
    {
        RequirementGroups = new List<BriefBuilderRequirementGroupResponse>();
    }

    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public List<BriefBuilderRequirementGroupResponse> RequirementGroups { get; set; }
}

public class BriefBuilderRequirementGroupResponse
{
    public BriefBuilderRequirementGroupResponse()
    {
        Requirements = new List<BriefBuilderRequirementGroupRequirementResponse>();
    }

    public string Name { get; set; } = string.Empty;

    public List<BriefBuilderRequirementGroupRequirementResponse> Requirements { get; set; }
}


public class BriefBuilderRequirementGroupRequirementResponse
{
    public string Name { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;
}