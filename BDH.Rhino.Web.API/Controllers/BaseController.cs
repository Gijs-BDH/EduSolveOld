using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : Controller
    {
        protected readonly BDHRhinoWebContext context;
        protected readonly UserUtility userUtility;


        public BaseController(BDHRhinoWebContext context, UserUtility userUtility)
        {
            this.context = context;
            this.userUtility = userUtility;
        }

        protected User? GetLoggedInUser()
        {
            return userUtility.GetLoggedInUser();
        }

        protected bool IsLoggedInUserAdmin()
        {
            var user = userUtility.GetLoggedInUser();

            if (user == null)
            {
                return false;
            }

            return user.IsAdmin;
        }

        protected ActionResult RedirectToNoAccess()
        {
            return Redirect("/Home/NoAccess");
        }

        protected IActionResult UserNotLoggedInResult()
        {
            return Forbid("U moet ingelogd zijn om deze bewerking uit te voeren.");
        }

        protected IActionResult UserHasInsufficientRightsResult()
        {
            return Forbid("U heeft onvoldoende rechten om deze handeling uit te voeren.");
        }

        protected IActionResult ModelNotFoundOrForbiddenResult()
        {
            return Forbid("Het aangevraagde model bestaat niet, of u heeft niet genoeg rechten om deze te bewerken.");
        }
    }
}
