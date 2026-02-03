namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class LoadVersionRequest
    {
        public string ProjectId { get; set; } = null!;
        public string VersionId { get; set; } = null!;
    }
}
