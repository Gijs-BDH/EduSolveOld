using System.Security.Claims;

namespace BDH.Rhino.Web.API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetAuthenticationKey(this ClaimsPrincipal principal)
        {
            return GetClaimValue(principal, ClaimTypes.NameIdentifier);
        }

        public static string GetEmail(this ClaimsPrincipal principal)
        {
            return GetClaimValue(principal, ClaimTypes.Email);
        }

        private static string GetClaimValue(ClaimsPrincipal principal, string claimType)
        {
            var claim = principal.Claims.FirstOrDefault(c => c.Type == claimType);
            if (claim == null)
            {
                return string.Empty;
            }

            return claim.Value;
        }
    }
}
