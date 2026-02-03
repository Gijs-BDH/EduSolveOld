using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class SchoolProject
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<SchoolProjectVersion> Versies { get; set; } = new HashSet<SchoolProjectVersion>();
        // public ICollection<SchoolProjectVersionCluster> Clusters { get; set; } = new HashSet<SchoolProjectVersionCluster>();
        public ICollection<IXY> BasePolygon { get; set; } = null!;
        public User Owner { get; set; } = null!;

        public SchoolProject()
        {
            Versies = new HashSet<SchoolProjectVersion>();
        }
    }
}
