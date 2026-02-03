using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Extensions;

namespace BDH.Rhino.Web.API.Utilities
{
    public class UserUtility
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly BDHRhinoWebContext _dbContext;


        public UserUtility(IHttpContextAccessor httpContextAccessor, BDHRhinoWebContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        public User? GetLoggedInUser()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                throw new InvalidOperationException("No context information availabe.");
            }

            var authenticationKey = httpContext.User.GetAuthenticationKey();

            var result = _dbContext
                .Users!
                .FirstOrDefault(u => u.AuthenticationKey == authenticationKey);

            return result;
        }

        public bool IsCurrentLoggedInUser(User loggedInuser, User user)
        {
            return loggedInuser.EmailAdress == user.EmailAdress;
        }
    }
}
