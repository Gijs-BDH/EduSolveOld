namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class UserResponse
    {
        public string EmailAddress { get; set; } = null!;

        public bool IsAdmin { get; set; }

        public bool CanBeModified { get; set; }

        public string Company { get; set; } = null!;

        public ICollection<string> Favorites { get; set; } = null!;
    }
}
