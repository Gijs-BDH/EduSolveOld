using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : BaseController
    {

        public CatalogController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }




        //CREATE
        [HttpPost]
        public IActionResult Create([FromQuery] string name)
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var owner = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress)
                .Company;

            var catalog = new BuildingConceptCatalog()
            {
                Id = Guid.NewGuid(),
                Name = name,
                BuildingConcepts = new HashSet<BuildingConcept>(),
                IsPrivate = true,
                Owner = owner
            };

            context.Add(catalog);
            context.SaveChanges();

            return Ok();
        }

        //READ
        [HttpGet("public")]
        public IActionResult GetPublic()
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress);

            var catalogs = context.BuildingConceptCatalogs!
                .Include(c => c.BuildingConcepts)
                .Include(c => c.Owner)
                .Where(c => c.Owner.Name == userEntity.Company.Name || !c.IsPrivate);
            var response = catalogs
                .Select(c => new CatalogResponse(c));
            return Ok(response);
        }


        [HttpGet("internal")]
        public IActionResult GetInternal()
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .ThenInclude(u => u.Catalogs)
                .ThenInclude(u => u.BuildingConcepts)
                .First(u => u.EmailAdress == user.EmailAdress);
            var response = userEntity.Company.Catalogs
                .Select(c => new CatalogResponse(c));
            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetById(Guid id)
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .ThenInclude(u => u.Catalogs)
                .ThenInclude(u => u.BuildingConcepts)
                .First(u => u.EmailAdress == user.EmailAdress);
            var catalogs = context.BuildingConceptCatalogs!
                .Include(c => c.BuildingConcepts)
                .Include(c => c.Owner)
                .Where(c => c.Owner.Name == userEntity.Company.Name || !c.IsPrivate);
            var first = catalogs
                .FirstOrDefault(c => c.Id == id);
            if (first is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            return Ok(new CatalogResponse(first));
        }


        //DELETE
        [HttpDelete]
        public IActionResult Delete([FromQuery] string id)
        {
            // First check if the logged in user is an admin.
            var loggedInUser = GetLoggedInUser();
            if (loggedInUser is null || !loggedInUser.IsAdmin)
            {
                return UserHasInsufficientRightsResult();
            }

            var catalog = context.Users!
                .Include(u => u.Company)
                .ThenInclude(c => c.Catalogs)
                .ThenInclude(c => c.BuildingConcepts)
                .ThenInclude(c => c.Geometry)
                .First(u => u.EmailAdress == loggedInUser.EmailAdress)
                .Company.Catalogs
                .FirstOrDefault(c => c.Id.ToString() == id);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            context.RemoveRange(catalog.BuildingConcepts.Select(c => c.Geometry));
            context.RemoveRange(catalog.BuildingConcepts);
            context.Remove(catalog);
            context.SaveChanges();
            return Ok();
        }
    }
}
