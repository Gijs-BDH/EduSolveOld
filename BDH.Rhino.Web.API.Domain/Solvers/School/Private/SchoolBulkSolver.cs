using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    internal class SchoolBulkSolver : ISchoolBulkSolver
    {
        private readonly ISchoolSolver solver;


        public SchoolBulkSolver(ISchoolSolver solver)
        {
            this.solver = solver;
        }



        public IEnumerable<GeneratedSchoolResponse> Solve(GenerateSchoolRequest request, int solutions)
        {
            var random = Random.Shared;
            for (int i = 0; i < solutions; i++)
            {
                GeneratedSchoolResponse? solution = null;

                try
                {
                    request.Seed = random.Next();
                    solution = solver.Solve(request);
                }
                catch
                {
                    //..
                }

                if (solution is not null)
                {
                    yield return solution;
                }
            }
        }
    }
}
