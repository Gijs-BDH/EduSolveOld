using BDH.Rhino.Web.API.Domain.Solvers;

namespace BDH.Rhino.Web.ConceptSolverTest
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var request = new ConceptSolverRequest()
            {
                Width = 15,
                Height = 6,
                Concepts = new List<ConceptSolverConceptData>()
                {
                    new ConceptSolverConceptData()
                    {
                        Id = "A",
                        EmptySpaceAllowedLeft = true,
                        AllowedLeft = new List<string>() { },
                        EmptySpaceAllowedRight = true,
                        AllowedRight = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedAbove = true,
                        AllowedAbove = new List<string>() { "A", "B", "C", "D" },
                        AllowedOnLowestLevel = false,
                        AllowedBelow = new List<string>() { "A", "B", "C", "D" }
                    },
                    new ConceptSolverConceptData()
                    {
                        Id = "B",
                        EmptySpaceAllowedLeft = false,
                        AllowedLeft = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedRight = true,
                        AllowedRight = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedAbove = true,
                        AllowedAbove = new List<string>() { "A", "B", "C", "D" },
                        AllowedOnLowestLevel = false,
                        AllowedBelow = new List<string>() { "A", "B", "C", "D" }
                    },
                    new ConceptSolverConceptData()
                    {
                        Id = "C",
                        EmptySpaceAllowedLeft = true,
                        AllowedLeft = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedRight = true,
                        AllowedRight = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedAbove = true,
                        AllowedAbove = new List<string>() { "A", "B", "C", "D" },
                        AllowedOnLowestLevel = true,
                        AllowedBelow = new List<string>() {  }
                    },
                    new ConceptSolverConceptData()
                    {
                        Id = "D",
                        EmptySpaceAllowedLeft = false,
                        AllowedLeft = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedRight = true,
                        AllowedRight = new List<string>() { "A", "B", "C", "D" },
                        EmptySpaceAllowedAbove = true,
                        AllowedAbove = new List<string>() { "A", "B", "C", "D" },
                        AllowedOnLowestLevel = false,
                        AllowedBelow = new List<string>() { "A", "B", "C", "D" }
                    }
                }
            };

            while (true)
            {
                var solver = new NaiveConceptSolver();
                ConceptSolverResponse response;

                for (int i = 0; i < 1000; i++)
                {
                    solver.Solve(request, 100);
                }

                response = solver.Solve(request, 100);

                for (int y = response.Solution[0].Count - 1; y >= 0; y--)
                {
                    for (int x = 0; x < response.Solution.Count; x++)
                    {
                        Console.Write(response.Solution[x][y].Id + "  ");
                    }

                    Console.WriteLine();
                }


                Console.ReadKey();

                Console.Clear();
            }
        }
    }
}