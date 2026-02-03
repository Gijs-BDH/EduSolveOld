namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class GetUsersResponse
    {
        public GetUsersResponse()
        {
            Users = new List<UserResponse>();
        }

        public ICollection<UserResponse> Users { get; set; }
    }
}
