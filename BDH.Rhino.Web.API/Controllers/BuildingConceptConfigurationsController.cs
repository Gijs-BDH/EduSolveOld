using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Schema.GenerativeDesign;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingConceptConfigurationsController : BaseController
    {
        public BuildingConceptConfigurationsController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }


        [HttpGet("catalog")]
        public IActionResult Get(Guid id)
        {
            var catalog = context.BuildingConceptCatalogs!
               .Include(c => c.Owner)
               .Include(c => c.BuildingConcepts)
               .FirstOrDefault(c => c.Id == id);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var configurations = context.GetConfigurations(catalog, out var width)
                .Select(c => new ConceptSolverConceptData().FromModel(c));
            return Ok(configurations);
        }



        [HttpPost("createDefault")]
        public IActionResult CreateDefault(Guid catalogId)
        {
            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress);

            var catalog = context.BuildingConceptCatalogs!
                .Include(c => c.Owner)
                .Include(c => c.BuildingConcepts)
                .Where(c => c.Owner.Name == userEntity.Company.Name)
                .FirstOrDefault(c => c.Id == catalogId);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            foreach (var concept in catalog.BuildingConcepts)
            {
                var existing = context.BuildingConceptConfigurations!
                    .Include(c => c.For)
                    .FirstOrDefault(c => c.For.Id == concept.Id);
                if (existing is not null)
                {
                    context.Remove(existing);
                }

                var configuration = new BuildingConceptConfiguration()
                {
                    Id = Guid.NewGuid(),
                    For = concept,
                    LeftIsIndifferent = true,
                    EmptySpaceAllowedLeft = true,
                    AllowedLeft = new HashSet<Guid>(),
                    RightIsIndifferent = true,
                    EmptySpaceAllowedRight = true,
                    AllowedRight = new HashSet<Guid>(),
                    AboveIsIndifferent = true,
                    EmptySpaceAllowedAbove = true,
                    AllowedAbove = new HashSet<Guid>(),
                    BelowIsIndifferent = true,
                    AllowedOnLowestLevel = true,
                    AllowedBelow = new HashSet<Guid>(),
                    ColumnSpan = 1,
                    RowSpan = 1
                };

                context.Add(configuration);
            }

            context.SaveChanges();
            return this.Get(catalogId);
        }

        [HttpPost("apply")]
        public IActionResult Apply([FromBody] ApplyBuildingConceptConfigurationRequest request)
        {
            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress);

            var catalog = context.BuildingConceptCatalogs!
                .Include(c => c.Owner)
                .Include(c => c.BuildingConcepts)
                .Where(c => c.Owner.Name == userEntity.Company.Name)
                .FirstOrDefault(c => c.Id == request.Catalog.Id);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            catalog.AllowedColumnsFrom = request.Catalog.AllowedColumnsFrom;
            catalog.AllowedColumnsTo = request.Catalog.AllowedColumnsTo;
            catalog.AllowedRowsFrom = request.Catalog.AllowedRowsFrom;
            catalog.AllowedRowsTo = request.Catalog.AllowedRowsTo;

            foreach (var concept in catalog.BuildingConcepts)
            {
                var conceptInput = request.Data.FirstOrDefault(c => c.BouwconceptId == concept.Id.ToString());
                if (conceptInput is null)
                {
                    return BadRequest("Onbekend bouwconcept tegen gekomen in configuratie");
                }

                var existing = context.BuildingConceptConfigurations!
                    .Include(c => c.For)
                    .FirstOrDefault(c => c.For.Id == concept.Id);
                if (existing is not null)
                {
                    context.Remove(existing);
                }

                var configuration = new BuildingConceptConfiguration()
                {
                    Id = Guid.NewGuid(),
                    For = concept,
                    LeftIsIndifferent = false,
                    EmptySpaceAllowedLeft = conceptInput.EmptySpaceAllowedLeft,
                    AllowedLeft = conceptInput.AllowedLeft.Select(c => new Guid(c)).ToArray(),
                    RightIsIndifferent = false,
                    EmptySpaceAllowedRight = conceptInput.EmptySpaceAllowedRight,
                    AllowedRight = conceptInput.AllowedRight.Select(c => new Guid(c)).ToArray(),
                    AboveIsIndifferent = false,
                    EmptySpaceAllowedAbove = conceptInput.EmptySpaceAllowedAbove,
                    AllowedAbove = conceptInput.AllowedAbove.Select(c => new Guid(c)).ToArray(),
                    BelowIsIndifferent = false,
                    AllowedOnLowestLevel = conceptInput.AllowedOnLowestLevel,
                    AllowedBelow = conceptInput.AllowedBelow.Select(c => new Guid(c)).ToArray(),
                    ColumnSpan = conceptInput.ColumnSpan,
                    RowSpan = conceptInput.RowSpan
                };

                context.Add(configuration);
            }

            context.Update(catalog);
            context.SaveChanges();
            return this.Get(request.Catalog.Id);
        }
    }
}
