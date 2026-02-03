namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class DeleteProjectVersionRequest
    {
        public Guid ProjectId { get; set; }
        public Guid VersionId { get; set; }
    }
}
