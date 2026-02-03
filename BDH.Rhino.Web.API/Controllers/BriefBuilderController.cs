using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace BDH.Rhino.Web.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BriefBuilderController : BaseController
{
    public BriefBuilderController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
    {

    }

    [HttpGet("GetList")]
    [AllowAnonymous]
    public async Task<ICollection<BriefBuilderProjectResponse>> Get()
    {
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Authorization", "Basic aC5uaWpib2VyLnJ1aW10ZW9rOnhzMkJyaWVmQnVpbGRlcg==");
        var availableProjects = await httpClient.GetFromJsonAsync<ICollection<BriefBuilderProjectResponse>>("https://api-app.briefbuilder.com/ext/api/project") ?? new List<BriefBuilderProjectResponse>();

        var result = new List<BriefBuilderProjectResponse>();
        foreach (var project in availableProjects)
        {
            project.BVOFactor = "-";
            result.Add(project);

            var projectInfo = await httpClient.GetFromJsonAsync<BriefBuilderRequirementResponse>($"https://api-app.briefbuilder.com/ext/api/project/{project.Id}/node/identifier/BU-1/requirements");
            if (projectInfo == null)
            {
                continue;
            }

            var generalGroup = projectInfo.RequirementGroups.FirstOrDefault(g => g.Name.Equals("Standaard kenmerken", StringComparison.InvariantCultureIgnoreCase));
            if (generalGroup == null)
            {
                continue;
            }

            var requirementBVOFactor = generalGroup.Requirements.FirstOrDefault(r => r.Name.Equals("BVO Factor", StringComparison.InvariantCultureIgnoreCase));
            if (requirementBVOFactor == null)
            {
                continue;
            }
            project.BVOFactor = requirementBVOFactor.Value.Replace("= ", string.Empty);

            var distinctColors = new List<string>
            {
                "#E6194B", // Red
                "#3CB44B", // Green
                "#FFE119", // Yellow
                "#0082C8", // Blue
                "#F58230", // Orange
                "#911EB4", // Purple
                "#46F0F0", // Cyan
                "#F032E6", // Magenta
                "#D2F53C", // Lime
                "#FABED4", // Pink
                "#008080", // Teal
                "#DCBEFF", // Lavender
                "#AA6E28", // Brown
                "#FFFAC8", // Beige
                "#800000", // Maroon
                "#AAFFC3", // Mint
                "#808000", // Olive
                "#FFD8B1", // Apricot
                "#000080", // Navy
                "#A9A9A9"  // Grey
            };

            var prefixes = new List<string>() { "GS", "OS" };
            foreach (var prefix in prefixes)


            {
                for (var i = 1; i <= 15; i++)
                {
                    try
                    {
                        var groupInfo = await httpClient.GetFromJsonAsync<BriefBuilderRequirementResponse>($"https://api-app.briefbuilder.com/ext/api/project/{project.Id}/node/identifier/{prefix}-{i}/requirements");
                        if (groupInfo == null)
                        {
                            continue;
                        }

                        if (groupInfo.Id == "GS-8")
                        {
                            continue;
                        }

                        var defaultAttributes = groupInfo
                                                .RequirementGroups
                                                .FirstOrDefault(rg => rg.Name.Equals("Standaard kenmerken", StringComparison.InvariantCultureIgnoreCase));

                        if (defaultAttributes == null)
                        {
                            defaultAttributes = groupInfo
                                                .RequirementGroups
                                                .FirstOrDefault(rg => rg.Name.Equals("Kenmerken", StringComparison.InvariantCultureIgnoreCase));
                        }

                        var requirementBVORawValue = string.Empty;
                        if (defaultAttributes != null)
                        {
                            var requirementBVO = defaultAttributes.Requirements.FirstOrDefault(r => r.Name.Equals("BVO", StringComparison.InvariantCultureIgnoreCase));
                            if (requirementBVO == null)
                            {
                                continue;
                            }

                            requirementBVORawValue = requirementBVO.Value;
                        }

                        if (string.IsNullOrWhiteSpace(requirementBVORawValue))
                        {
                            continue;
                        }

                        var connectedBuildingGroups = groupInfo.RequirementGroups.FirstOrDefault(rg => rg.Name.Equals("Ruimtelijke relaties"));
                        var connectedGroups = new List<string>();
                        if (connectedBuildingGroups != null)
                        {
                            connectedGroups = connectedBuildingGroups.Requirements.Select(r => r.Name).ToList();
                        }

                        int groupBuildingRequirementBVO;
                        int.TryParse(requirementBVORawValue.Replace("= ", string.Empty), out groupBuildingRequirementBVO);



                        var lowestLevel = 0;
                        var highestLevel = 3;
                        var levelHeight = 1;
                        string color = $"#{Random.Shared.Next(0x1000000):X6}";

                        if (distinctColors.Any())
                        {
                            color = distinctColors.First();
                            distinctColors.Remove(distinctColors.First());
                        }

                        if (groupInfo.Name.Equals("Onderbouw", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }
                        if (groupInfo.Name.Equals("Middenbouw", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 1;
                        }
                        if (groupInfo.Name.Equals("Bovenbouw", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 1;
                            highestLevel = 3;
                        }

                        if (groupInfo.Name.Equals("Centrale ruimten", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                            levelHeight = 2;
                        }

                        if (groupInfo.Name.Equals("Voorschoolse educatie", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Schoolplein Onderbouw", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Schoolplein Midden- en Bovenbouw", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Buitenspeelruimte; Voorschoolse educatie", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Onoverdekte fietsenstalling; kinderen/ouders", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Overdekte fietsenstalling; personeel", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        if (groupInfo.Name.Equals("Opstelplaats fietsen ouders tijdens halen/brengen", StringComparison.InvariantCultureIgnoreCase))
                        {
                            lowestLevel = 0;
                            highestLevel = 0;
                        }

                        project.BuildingGroups.Add(new BriefBuilderBuildingGroupResponse
                        {
                            Name = groupInfo.Name,
                            BVO = groupBuildingRequirementBVO,
                            Color = color,
                            LowestLevel = lowestLevel,
                            HighestLevel = highestLevel,
                            LevelHeight = levelHeight,
                            ConnectedTo = connectedGroups
                        });
                    }
                    catch (Exception)
                    {
                    }
                }
            }

            foreach (var buildingGroup in project.BuildingGroups)
            {
                foreach (var item in buildingGroup.ConnectedTo)
                {
                    if (project.Connections.Any(c => c.Group1.Equals(buildingGroup.Name, StringComparison.InvariantCultureIgnoreCase) && c.Group2.Equals(item, StringComparison.InvariantCultureIgnoreCase)))
                    {
                        continue;
                    }

                    if (project.Connections.Any(c => c.Group2.Equals(buildingGroup.Name, StringComparison.InvariantCultureIgnoreCase) && c.Group1.Equals(item, StringComparison.InvariantCultureIgnoreCase)))
                    {
                        continue;
                    }

                    project.Connections.Add(new BriefBuilderBuildingGroupConnectionResponse
                    {
                        Group1 = buildingGroup.Name,
                        Group2 = item
                    });
                }
            }
        }

        return result;
    }

    [HttpGet("GetById/{identifier}")]
    [AllowAnonymous]
    public async Task<BriefBuilderProjectResponse> Get(string identifier)
    {
        var result = await Get();

        return result.FirstOrDefault(p => p.Id == identifier);
    }
}