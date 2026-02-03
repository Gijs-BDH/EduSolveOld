using BDH.Rhino.Web.API.Schema.Data;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class NewSchoolProjectRequest
    {
        //public ICollection<SchoolProjectVersionClusterSchema> Clusters { get; set; } = null!;
        public ICollection<Point2dData> BasePolygon { get; set; } = null!;
        public string Name { get; set; } = null!;
    }
}
