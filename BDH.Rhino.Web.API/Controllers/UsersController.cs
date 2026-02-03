using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : BaseController
    {
        public UsersController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }


        //CREATE
        // POST: api/<BouwConceptController>
        [HttpPost]
        public IActionResult NewUser([FromBody] NewUserRequest model)
        {
            if (!IsLoggedInUserAdmin())
            {
                return Forbid();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUserWithSameEmailAddress = context.Users!.Find(model.Email);

            if (existingUserWithSameEmailAddress != null)
            {
                return BadRequest(new { message = "E-mailadres is al in gebruik." });
            }

            var company = context.Companies?.FirstOrDefault(c => c.Name == model.Company);
            if (company is null)
            {
                return NotFound();
            }

            var userEntity = model.ToUser(company);
            context.Users.Add(userEntity);
            context.SaveChanges();

            return Ok();
        }


        //READ
        // GET: api/<BouwConceptController>
        [HttpGet]
        public IActionResult Get()
        {
            var loggedInUser = GetLoggedInUser();
            if (loggedInUser is null || !loggedInUser.IsAdmin)
            {
                return RedirectToNoAccess();
            }

            var model = new GetUsersResponse();

            var users = context.Users!
                .Include(u => u.Company)
                .OrderBy(u => u.EmailAdress);

            foreach (var user in users)
            {
                model.Users.Add(new UserResponse
                {
                    EmailAddress = user.EmailAdress,
                    IsAdmin = user.IsAdmin,
                    CanBeModified = !userUtility.IsCurrentLoggedInUser(loggedInUser, user),
                    Company = user.Company.Name,

                });
            }

            return Ok(model);
        }

        // GET: api/<BouwConceptController>/email
        [HttpPost("email")]
        public IActionResult Get(GetUserRequest request)
        {
            var loggedInUser = GetLoggedInUser();
            if (loggedInUser is null)
            {
                return Forbid();
            }

            var user = context.Users!
                .Include(u => u.Company)
                .FirstOrDefault(u => u.EmailAdress == request.Email);
            if (user == null)
            {
                return NotFound();
            }

            var favorites = context.UserFavorites!
                .Include(c => c.Bouwconcept)
                .Include(c => c.User)
                .Where(c => c.User.EmailAdress == user.EmailAdress);
            var model = new UserResponse()
            {
                EmailAddress = user.EmailAdress,
                IsAdmin = user.IsAdmin,
                CanBeModified = !userUtility.IsCurrentLoggedInUser(loggedInUser, user),
                Company = user.Company.Name,
                Favorites = favorites.Select(f => f.Bouwconcept.Id.ToString()).ToList()
            };

            return Ok(model);
        }



        // UPDATE
        // POST: api/<BouwConceptController>/edit
        [HttpPost("edit")]
        public IActionResult EditUser([FromBody] EditUserRequest model)
        {
            if (!IsLoggedInUserAdmin())
            {
                return Forbid();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = context.Users!.FirstOrDefault(u => u.EmailAdress.Equals(model.Email));
            if (user == null)
            {
                return NotFound();
            }

            var company = context.Companies!.FirstOrDefault(c => c.Name == model.Company);
            if (company == null)
            {
                ModelState.AddModelError(nameof(model.Company), "Bedrijf onbekend");
                return BadRequest(ModelState);
            }

            user.Company = company;
            user.IsAdmin = model.IsAdmin;
            context.SaveChanges();

            return Ok();
        }


        //DELETE =======
        // DELETE: api/<BouwConceptController>
        [HttpDelete]
        public IActionResult Delete(string emailAddress)
        {
            // First check if the logged in user is an admin.
            var loggedInUser = GetLoggedInUser();
            if (loggedInUser is null || !loggedInUser.IsAdmin)
            {
                return UserHasInsufficientRightsResult();
            }

            var userToDelete = context.Users!.FirstOrDefault(u => u.EmailAdress == emailAddress);
            if (userToDelete == null)
            {
                return Ok();
            }

            // Check if user is not deleting his own record.
            if (userUtility.IsCurrentLoggedInUser(loggedInUser, userToDelete))
            {
                return BadRequest("U kunt niet uzelf verwijderen.");
            }

            context.Users!.Remove(userToDelete);
            context.SaveChanges();
            return Ok();
        }
    }
}
