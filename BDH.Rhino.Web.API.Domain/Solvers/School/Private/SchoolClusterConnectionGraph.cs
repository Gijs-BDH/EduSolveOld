using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolClusterConnectionGraph
    {
        private readonly Dictionary<GenerateSchoolClusterRequest, ICollection<GenerateSchoolClusterRequest>> connections;

        public SchoolClusterConnectionGraph()
        {
            this.connections = new();
        }

        public void Connect(GenerateSchoolClusterRequest first, GenerateSchoolClusterRequest second)
        {
            if (first == second)
            {
                return;
            }

            if (this.connections.TryGetValue(first, out var connections))
            {
                connections.Add(second);
            }
            else
            {
                var collection = new List<GenerateSchoolClusterRequest>() { second };
                this.connections.Add(first, collection);
            }

            if (this.connections.TryGetValue(second, out var _connections))
            {
                _connections.Add(first);
            }
            else
            {
                var collection = new List<GenerateSchoolClusterRequest>() { first };
                this.connections.Add(second, collection);
            }
        }

        public IEnumerable<GenerateSchoolClusterRequest> Connections(GenerateSchoolClusterRequest cluster)
        {
            if (this.connections.TryGetValue(cluster, out var connections))
            {
                return connections;
            }

            return new List<GenerateSchoolClusterRequest>();
        }
    }
}
