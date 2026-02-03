namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class SaveVersionProfitReportRequest
    {
        public string ProjectId { get; set; } = null!;
        public string VersionId { get; set; } = null!;

        public string Report { get; set; } = null!;
    }
}
