using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoritesController : BaseController
    {
        public UserFavoritesController(BDHRhinoWebContext context, UserUtility users) : base(context, users)
        {

        }


        //CREATE
        [HttpPost]
        public IActionResult Add([FromQuery] string id)
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var bouwconcept = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, false)
                .FirstOrDefault(c => c.Id.ToString() == id);
            if (bouwconcept is null)
            {
                return NotFound("Bouwconcept is niet gevonden.");
            }

            var entity = new UserFavorite()
            {
                Id = Guid.NewGuid(),
                User = user,
                Bouwconcept = bouwconcept
            };

            context.Add(entity);
            context.SaveChanges();

            return Ok(true);
        }




        //READ
        [HttpGet]
        public IActionResult Get()
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var favorites = context.UserFavorites!
                .Include(f => f.User)
                .Include(f => f.Bouwconcept)
                .Where(e => e.User.EmailAdress == user.EmailAdress)
                .Select(e => e.Bouwconcept.Id);

            return Ok(favorites);
        }



        //UPDATE




        //DELETE
        [HttpDelete]
        public IActionResult Delete([FromQuery] string id)
        {
            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var favorite = context.UserFavorites!
                .Include(f => f.User)
                .Include(f => f.Bouwconcept)
                .Where(e => e.User.EmailAdress == user.EmailAdress)
                .FirstOrDefault(c => c.Bouwconcept.Id.ToString() == id);
            if (favorite is not null)
            {
                context.Remove(favorite);
                context.SaveChanges();
            }

            return Ok(false);
        }
    }
}
