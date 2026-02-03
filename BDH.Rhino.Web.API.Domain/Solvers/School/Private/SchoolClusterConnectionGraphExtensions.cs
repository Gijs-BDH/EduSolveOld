using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public static class SchoolClusterConnectionGraphExtensions
    {
        public static SchoolClusterConnectionGraph CreateCentralAula(this IEnumerable<GenerateSchoolClusterRequest> clusters)
        {
            var aula = clusters.FirstOrDefault(c => c.Name.ToLower() == "aula");
            if (aula is null)
            {
                throw new Exception("No 'aula' found in cluster set.");
            }

            var graph = new SchoolClusterConnectionGraph();
            foreach (var cluster in clusters)
            {
                graph.Connect(aula, cluster);
            }

            return graph;
        }

        public static SchoolClusterConnectionGraph Create(this IEnumerable<GenerateSchoolClusterRequest> clusters)
        {
            var graph = new SchoolClusterConnectionGraph();
            foreach (var cluster in clusters)
            {
                foreach (var to in cluster.Connections)
                {
                    var target = clusters.FirstOrDefault(c => c.Name.ToLower() == to.ToLower());
                    if (target is null)
                    {
                        throw new Exception("Could not find target cluster in connection grpah.");
                    }

                    graph.Connect(cluster, target);
                }
            }

            return graph;
        }
    }
}
