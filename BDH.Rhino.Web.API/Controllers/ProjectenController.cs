using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Converters;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectenController : BaseController
    {
        public ProjectenController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }



        //CREATE
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateProjectRequest value)
        {
            var user = GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (value.BasePolygon.Geometry.Coordinates.Count < 1 || value.BasePolygon.Geometry.Coordinates.First().Count < 3)
            {
                return BadRequest("Project boundary contains less than 3 points.");
            }

            if (context.Projects!.Any(p => p.CreatedBy == user.EmailAdress && p.Name == value.Name))
            {
                return BadRequest("U heeft al een project met deze naam. Kies een unieke naam.");
            }

            var id = Guid.NewGuid().ToString();
            var entity = new Project()
            {
                Id = id,
                Name = value.Name,
                CreatedBy = user.EmailAdress,
                CreatedDate = DateTime.Now,
                IsVersion2Compatible = true,
                BasePolygon = value.BasePolygon.SerializeToJSON()
            };

            context.Add(entity);
            await context.SaveChangesAsync();

            var response = new ProjectResponse()
            {
                Name = entity.Name,
                Id = entity.Id,
                CreatedBy = entity.CreatedBy,
                CreatedDate = entity.CreatedDate.ToShortDateString(),
                BasePolygon = GrasshopperUtil.ToPolygon<EmptyJsonProperties>(entity.BasePolygon),
                Versions = new List<ProjectVersionReponse>()
            };
            return Ok(response);
        }



        //READ
        [HttpGet]
        public IActionResult Get()
        {
            var currentUser = this.GetLoggedInUser();

            var projects = context.Projects!
                .Where(p => p.IsVersion2Compatible)
                .Include(p => p.Versions)
                .Select(p => new ProjectResponse()
                {
                    Name = p.Name,
                    Id = p.Id,
                    CreatedBy = p.CreatedBy,
                    CreatedDate = p.CreatedDate.ToShortDateString(),
                    BasePolygon = GrasshopperUtil.ToPolygon<EmptyJsonProperties>(p.BasePolygon),
                    Versions = p.Versions.Where(p => p.IsVersion2Compatible).Select(p => new ProjectVersionReponse()
                    {
                        Id = p.Id,
                        Name = p.Name
                    })
                });

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var project = context.Projects!
                .Include(p => p.Versions)
                .Where(p => p.IsVersion2Compatible)
                .FirstOrDefault(p => p.Id == id);
            if (project == null)
            {
                return NotFound();
            }

            var versions = project.Versions.Select(p => new ProjectVersionReponse()
            {
                Name = p.Name,
                Id = p.Id
            });

            var reponse = new GetProjectResponse(versions, GrasshopperUtil.ToPolygon<EmptyJsonProperties>(project.BasePolygon));

            return Ok(reponse);
        }

        [HttpPost("version")]
        public IActionResult GetVersion([FromBody] LoadVersionRequest value)
        {
            var project = context.Projects!
                .Include(p => p.Versions).ThenInclude(v => v.BouwconceptTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.GenericMassTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BuildingConceptCatalogTransformations)
                .Where(p => p.IsVersion2Compatible)
                .FirstOrDefault(p => p.Id == value.ProjectId);
            if (project == null)
            {
                return NotFound();
            }

            var projectVersion = project.Versions
                .Where(p => p.IsVersion2Compatible)
                .FirstOrDefault(p => p.Id == value.VersionId);
            if (projectVersion == null)
            {
                return NotFound();
            }

            var reponse = new GetProjectVersionResponse()
            {
                Name = projectVersion.Name,
                GenericMasses = projectVersion.GenericMassTransformations.Select(t => new GenericMassTransformResponse()
                {
                    BouwkostenTypologie = t.BouwkostenTypologie,
                    LocationX = t.LocationX,
                    LocationY = t.LocationY,
                    Rotation = t.Rotation,
                    Width = t.Width,
                    Height = t.Height,
                    Depth = t.Depth
                }),
                BuildingConcepts = projectVersion.BouwconceptTransformations.Select(t => new BuildingConceptTransformResponse()
                {
                    TypologyId = t.BouwconceptId.ToString(),
                    LocationX = t.LocationX,
                    LocationY = t.LocationY,
                    Rotation = t.Rotation,
                    Verdiepingen = t.Verdiepingen
                }),
                Catalogs = projectVersion.BuildingConceptCatalogTransformations.Select(t => new BuildingConceptCatalogTransformationResponse(t)),
                Ways = GrasshopperUtil.ToPolylineCollection<GenerativeDesignWayProperties>(projectVersion.Ways ?? "[]"),
                ProfitReport = projectVersion.ProfitReport
            };

            return Ok(reponse);
        }



        //UPDATE
        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] SaveVersionRequest value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = context.Projects!
                .Include(p => p.Versions).ThenInclude(v => v.BouwconceptTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.GenericMassTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BuildingConceptCatalogTransformations)
                .FirstOrDefault(p => p.Id == value.ProjectId);
            if (project is null)
            {
                return NotFound("Cannot find the project to save this version to.");
            }

            var existingVersion = project.Versions
                .FirstOrDefault(v => v.Name == value.Name);
            if (existingVersion is null)
            {
                var bouwconcepten = value.BuildingConcepts
                    .Select(c => new BuildingConceptTransformationEntity()
                    {
                        Id = Guid.NewGuid(),
                        BouwconceptId = new Guid(c.TypologyId),
                        LocationX = c.LocationX,
                        LocationY = c.LocationY,
                        Rotation = c.Rotation,
                        Verdiepingen = c.Verdiepingen
                    }).ToArray();

                var masses = value.GenericMasses
                    .Select(m => new GenericMassTransformationEntity()
                    {
                        Id = Guid.NewGuid(),
                        BouwconceptId = Guid.NewGuid(),
                        BouwkostenTypologie = m.BouwkostenTypologie,
                        LocationX = m.LocationX,
                        LocationY = m.LocationY,
                        Rotation = m.Rotation,
                        Width = m.Width,
                        Height = m.Height,
                        Depth = m.Depth
                    }).ToArray();

                var catalogs = value.Catalogs
                    .Select(c => new BuildingConceptCatalogTransformation()
                    {
                        Id = Guid.NewGuid(),
                        BuildingConceptCatalogId = c.BuildingConceptCatalogId,
                        EndPointX = c.EndPointX,
                        EndPointY = c.EndPointY,
                        StartPointX = c.StartPointX,
                        StartPointY = c.StartPointY,
                        UsedSeed = c.UsedSeed,
                        Pinned = c.Pinned,
                        LevelsFrom = c.LevelsFrom,
                        LevelsTo = c.LevelsTo
                    }).ToArray();

                var newVersion = new ProjectVersion()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = value.Name,
                    IsVersion2Compatible = true,
                    BouwconceptTransformations = bouwconcepten,
                    GenericMassTransformations = masses,
                    BuildingConceptCatalogTransformations = catalogs,
                    Ways = GrasshopperUtil.ConvertToString(value.Ways)
                };

                context.AddRange(bouwconcepten);
                context.AddRange(masses);
                context.AddRange(catalogs);
                context.Add(newVersion);

                project.Versions.Add(newVersion);

                await context.SaveChangesAsync();
                return Ok();
            }

            context.RemoveRange(existingVersion.BouwconceptTransformations);
            context.RemoveRange(existingVersion.GenericMassTransformations);
            context.RemoveRange(existingVersion.BuildingConceptCatalogTransformations);

            var newConceptCollection = value.BuildingConcepts
                .Select(c => new BuildingConceptTransformationEntity()
                {
                    Id = Guid.NewGuid(),
                    BouwconceptId = new Guid(c.TypologyId),
                    LocationX = c.LocationX,
                    LocationY = c.LocationY,
                    Rotation = c.Rotation,
                    Verdiepingen = c.Verdiepingen
                }).ToList();
            var newGenericMassCollection = value.GenericMasses
                .Select(m => new GenericMassTransformationEntity()
                {
                    Id = Guid.NewGuid(),
                    BouwconceptId = Guid.NewGuid(),
                    BouwkostenTypologie = m.BouwkostenTypologie,
                    LocationX = m.LocationX,
                    LocationY = m.LocationY,
                    Rotation = m.Rotation,
                    Width = m.Width,
                    Height = m.Height,
                    Depth = m.Depth
                }).ToList();
            var newCatalogs = value.Catalogs
                .Select(c => new BuildingConceptCatalogTransformation()
                {
                    Id = Guid.NewGuid(),
                    BuildingConceptCatalogId = c.BuildingConceptCatalogId,
                    EndPointX = c.EndPointX,
                    EndPointY = c.EndPointY,
                    StartPointX = c.StartPointX,
                    StartPointY = c.StartPointY,
                    UsedSeed = c.UsedSeed,
                    Pinned = c.Pinned,
                    LevelsFrom = c.LevelsFrom,
                    LevelsTo = c.LevelsTo
                }).ToList();

            existingVersion.BouwconceptTransformations = newConceptCollection;
            existingVersion.BuildingConceptCatalogTransformations = newCatalogs;
            existingVersion.GenericMassTransformations = newGenericMassCollection;
            existingVersion.Ways = GrasshopperUtil.ConvertToString(value.Ways);

            context.Update(existingVersion);
            context.AddRange(newConceptCollection);
            context.AddRange(newGenericMassCollection);
            context.AddRange(newCatalogs);

            await context.SaveChangesAsync();
            return Ok();
        }



        //DELETE
        [HttpDelete("{value}")]
        public async Task<IActionResult> Delete([FromBody] DeleteProjectRequest value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = context.Projects!
                .Include(p => p.Versions).ThenInclude(v => v.GenericMassTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BouwconceptTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BuildingConceptCatalogTransformations)
                .FirstOrDefault(p => p.Id == value.Id.ToString());
            if (entity is null)
            {
                return NotFound("Project not found in database.");
            }

            context.Remove(entity);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("version")]
        public async Task<IActionResult> DeleteVersion([FromBody] DeleteProjectVersionRequest value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = context.Projects!
                .Include(p => p.Versions).ThenInclude(v => v.GenericMassTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BouwconceptTransformations)
                .Include(p => p.Versions).ThenInclude(v => v.BuildingConceptCatalogTransformations)
                .FirstOrDefault(p => p.Id == value.ProjectId.ToString());
            if (entity is null)
            {
                return NotFound("Project not found in database.");
            }

            var version = entity.Versions.FirstOrDefault(v => v.Id == value.VersionId.ToString());
            if (version is null)
            {
                return NotFound();
            }

            context.Remove(version);
            await context.SaveChangesAsync();

            return Ok();
        }

        //UPDATE
        [HttpPost("savereport")]
        public async Task<IActionResult> SaveVersionProfitReport([FromBody] SaveVersionProfitReportRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = context.Projects!
                .Include(p => p.Versions)
                .FirstOrDefault(p => p.Id == request.ProjectId);

            if (project is null)
            {
                return NotFound("Cannot find the project to save the report to.");
            }

            var projectVersion = project.Versions.FirstOrDefault(v => v.Id == request.VersionId);
            if (projectVersion is null)
            {
                return NotFound("Cannot find the project version to save the report to.");
            }

            projectVersion.ProfitReport = request.Report;

            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
