namespace BDH.Rhino.Web.API.Schema.SchoolProject
{
    public class SaveSchoolProjectVersionRequest
    {
        public string ProjectId { get; set; } = null!;
        public SchoolProjectVersionSchema ProjectVersion { get; set; } = null!;
    }
}
