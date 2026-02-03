using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Schema.SchoolProject;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolProjectController : BaseController
    {
        private readonly IPoint2dFactory pointFactory;
        private readonly IColorRgbSerialier colorSerializer;

        public SchoolProjectController(BDHRhinoWebContext context, UserUtility users, IPoint2dFactory pointFactory, IColorRgbSerialier colorSerializer) : base(context, users)
        {
            this.pointFactory = pointFactory;
            this.colorSerializer = colorSerializer;
        }


        //CREATE
        //=--------------
        [HttpPost]
        public IActionResult Create([FromBody] NewSchoolProjectRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (request.BasePolygon.Count < 3)
            {
                return BadRequest("Project boundary contains less than 3 points.");
            }

            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var entity = new SchoolProject()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                BasePolygon = request.BasePolygon.Select(p => pointFactory.Point2D(p.X, p.Y)).ToArray(),
                Owner = user,
            };
            context.Add(entity);
            context.SaveChanges();

            return Ok(new SchoolProjectResponse(entity, colorSerializer));
        }




        //READ
        //=------------
        [HttpGet]
        public IActionResult Get()
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var projects = context.SchoolProjects!
                .Include(p => p.Owner)
                .Where(p => p.Owner.EmailAdress == user.EmailAdress)
                .Include(p => p.Versies)
                    .ThenInclude(p => p.ConstructionConcept)
                    .ThenInclude(p => p.Producer)
                .Include(p => p.Versies)
                    .ThenInclude(v => v.Clusters)
                .Select(p => new SchoolProjectResponse(p, colorSerializer))
                .ToArray();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var project = context.SchoolProjects!
                .Include(p => p.Owner)
                .Where(p => p.Owner.EmailAdress == user.EmailAdress)
                .FirstOrDefault(p => p.Id == id);
            if (project is null)
            {
                return NotFound();
            }

            return Ok(new SchoolProjectResponse(project, colorSerializer));
        }

        [HttpGet("version")]
        public IActionResult GetVersion(Guid id)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var version = context.SchoolProjectVersions!
                .Include(v => v.Clusters)
                .Include(v => v.ConstructionConcept)
                .ThenInclude(v => v.Producer)
                .FirstOrDefault(v => v.Id == id);
            if (version is null)
            {
                return NotFound();
            }

            return Ok(new SchoolProjectVersionResponse(version, colorSerializer));
        }


        //UPDATE
        //===------
        [HttpPost("save")]
        public IActionResult Save([FromBody] SaveSchoolProjectVersionRequest request)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = context.SchoolProjects!
                .Include(c => c.Versies).ThenInclude(v => v.Clusters)
                .Include(c => c.Versies).ThenInclude(v => v.ConstructionConcept)
                .FirstOrDefault(v => v.Id.ToString() == request.ProjectId);
            if (project is null)
            {
                return NotFound();
            }

            var constructionConcept = context.ConstructionConcepts
                .Include(v => v.Producer)
                .FirstOrDefault(c => c.Id == request.ProjectVersion.ConstructionConceptId);
            if (constructionConcept is null)
            {
                return NotFound("Construction concept not found.");
            }

            var clusters = request.ProjectVersion.Clusters.Select(c =>
            {
                return new SchoolProjectVersionCluster()
                {
                    Id = Guid.NewGuid(),
                    BVO = c.BVO,
                    Name = c.Name,
                    LowestLevel = c.LowestLevel,
                    HighestLevel = c.HighestLevel,
                    Levels = c.Levels,
                    FixedPoints = c.FixedPoints.OfType<IXY>().ToArray(),
                    Color = colorSerializer.FromString(c.Color),
                    Shape = c.Shape,
                    ShapeWidth = c.ShapeWidth,
                    Connections = c.Connections
                };
            }).ToArray();
            context.AddRange(clusters);

            var newVersion = new SchoolProjectVersion()
            {
                Id = Guid.NewGuid(),
                Name = request.ProjectVersion.Name,
                MinimumGridSize = request.ProjectVersion.MinimumGridSize,
                GridRotation = request.ProjectVersion.GridRotation,
                GridTranslation = request.ProjectVersion.GridTranslation,
                GridHeight = request.ProjectVersion.LevelHeight,
                Obstacles = request.ProjectVersion.Obstacles.OfType<IXY>().ToArray(),
                ConstructionConcept = constructionConcept,
                Clusters = clusters,
                Seed = request.ProjectVersion.Seed,
                AllowDisconnected = request.ProjectVersion.AllowDisconnected
            };
            context.Add(newVersion);

            project.Versies.Add(newVersion);
            context.SaveChanges();

            return Ok();
        }



        //DELETE
        //-----------
        [HttpDelete("{value}")]
        public async Task<IActionResult> Delete([FromBody] DeleteProjectRequest value)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = context.SchoolProjects!
                .Include(p => p.Owner)
                .Where(p => p.Owner.EmailAdress == user.EmailAdress)
                .Include(p => p.Versies).ThenInclude(c => c.Clusters)
                .FirstOrDefault(p => p.Id == value.Id);
            if (entity is null)
            {
                return NotFound("Project not found in database.");
            }

            context.RemoveRange(entity.Versies.SelectMany(v => v.Clusters));
            context.RemoveRange(entity.Versies);
            context.Remove(entity);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("version")]
        public async Task<IActionResult> DeleteVersion([FromBody] DeleteProjectVersionRequest value)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = context.SchoolProjects!
                .Include(p => p.Owner)
                .Where(p => p.Owner.EmailAdress == user.EmailAdress)
                .Include(p => p.Versies).ThenInclude(c => c.Clusters)
                .FirstOrDefault(p => p.Id == value.ProjectId);
            if (entity is null)
            {
                return NotFound("Project not found in database.");
            }

            var version = entity.Versies.FirstOrDefault(v => v.Id == value.VersionId);
            if (version is null)
            {
                return NotFound();
            }

            context.RemoveRange(version.Clusters);
            context.Remove(version);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
