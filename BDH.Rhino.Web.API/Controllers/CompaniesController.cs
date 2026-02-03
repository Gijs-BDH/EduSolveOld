using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : BaseController
    {
        public CompaniesController(BDHRhinoWebContext webContext, UserUtility userUtility) : base(webContext, userUtility)
        {

        }

        //CREATE ======
        // POST : api/<controller>
        [HttpPost]
        public IActionResult AddCompany([FromBody] Company company)
        {
            if (!IsLoggedInUserAdmin())
            {
                return RedirectToNoAccess();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrWhiteSpace(company.Name))
            {
                return BadRequest("Company name was empty.");
            }

            var existingCompany = context.Companies!.Find(company.Name);
            if (existingCompany != null)
            {
                ModelState.AddModelError(nameof(company.Name), "Er bestaat al een bedrijf met deze naam.");
                return BadRequest(ModelState);
            }

            context.Companies.Add(company);
            context.SaveChanges();

            return Ok();
        }

        // READ =============
        // GET : api/<controller>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            var response = new GetCompaniesResponse()
            {
                Companies = this.context.Companies!.Select(c => c.Name)
            };

            return Ok(response);
        }



        //UPDATE =======

        //DELETE =======
        // DELETE: api/<CompaniesController>
        [HttpDelete]
        public IActionResult Delete(string name)
        {
            // First check if the logged in user is an admin.
            var loggedInUser = GetLoggedInUser();
            if (loggedInUser is null || !loggedInUser.IsAdmin)
            {
                return UserHasInsufficientRightsResult();
            }

            var companyToDelete = context.Companies!.FirstOrDefault(u => u.Name == name);
            if (companyToDelete == null)
            {
                return Ok();
            }

            context.Companies!.Remove(companyToDelete);
            context.SaveChanges();
            return Ok();
        }

    }
}
