using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;
using BDH.Rhino.Web.API.Solvers.Concept;

namespace BDH.Rhino.Web.API.Domain.Solvers.Concept.Private
{
    internal class NaiveConceptSolver : IConceptConfiguratieSolver
    {
        public NaiveConceptSolver()
        {

        }

        public ConceptSolverResponse Solve(ConceptSolverRequest request, int attmepts, Random random)
        {
            for (int i = 0; i < attmepts; i++)
            {
                var height = random.Next(request.HeightFrom, request.HeightTo + 1);
                var grid = new ConceptSolverGrid(request.Width, height);
                if (TrySolve(request, grid, random, height))
                {
                    var solution = new List<IList<ConceptSolverGridCellResponse>>();
                    foreach (var column in grid.IterateColums())
                    {
                        var list = new List<ConceptSolverGridCellResponse>();
                        foreach (var row in column)
                        {
                            list.Add(new ConceptSolverGridCellResponse()
                            {
                                OriginFor = row.OriginFor is null ? null : new ConceptSolverConceptReponse()
                                {
                                    Bouwconcept = row.OriginFor.For,
                                    ColumnSpan = row.OriginFor.ColumnSpan,
                                    RowSpan = row.OriginFor.RowSpan
                                },
                                OccupiedBy = new ConceptSolverConceptReponse()
                                {
                                    Bouwconcept = row.OccupiedBy!.For,
                                    ColumnSpan = row.OccupiedBy.ColumnSpan,
                                    RowSpan = row.OccupiedBy.RowSpan
                                }
                            });
                        }
                        solution.Add(list);
                    }

                    return new ConceptSolverResponse()
                    {
                        Solution = solution
                    };
                }
            }

            throw new Exception($"Could not find a solution for the concept solver problem within {attmepts} attempts.");
        }


        private bool TrySolve(ConceptSolverRequest request, ConceptSolverGrid grid, Random random, double height)
        {
            for (var columnIndex = 0; columnIndex < request.Width; columnIndex++)
            {
                var column = new List<BuildingConceptConfiguration>();
                for (var rowIndex = 0; rowIndex < height; rowIndex++)
                {
                    var cell = grid.Get(columnIndex, rowIndex);
                    if (cell.OccupiedBy is not null)
                    {
                        continue;
                    }

                    var options = request.Concepts
                        //option too tall
                        .Where(c => columnIndex + c.ColumnSpan - 1 < request.Width)
                        //option too wide
                        .Where(c => rowIndex + c.RowSpan - 1 < height)
                        //look left
                        .Where(option =>
                        {
                            //kopgevel links
                            if (columnIndex == 0)
                            {
                                return option.LeftIsIndifferent || option.EmptySpaceAllowedLeft;
                            }

                            var leftCell = grid.GetOccupiedLeft(columnIndex, rowIndex);
                            var leftCellSaysOk = leftCell.RightIsIndifferent || leftCell.AllowedRight.Contains(option.For.Id);
                            var optionSaysOk = option.LeftIsIndifferent || option.AllowedLeft.Contains(leftCell.For.Id);
                            return leftCellSaysOk && optionSaysOk;
                        })
                        //look right
                        .Where(option =>
                        {
                            //kopgevel blok
                            if (columnIndex + option.ColumnSpan == request.Width)
                            {
                                return option.RightIsIndifferent || option.EmptySpaceAllowedRight;
                            }

                            //overig
                            return option.RightIsIndifferent || option.AllowedRight.Any();
                        })
                        //look below
                        .Where(option =>
                        {
                            //grondniveau
                            if (rowIndex == 0)
                            {
                                return option.BelowIsIndifferent || option.AllowedOnLowestLevel;
                            }

                            var belowCell = grid.GetOccupiedBelow(columnIndex, rowIndex);
                            var belowCellSaysOk = belowCell.AboveIsIndifferent || belowCell.AllowedAbove.Contains(option.For.Id);
                            var optionSaysOk = option.BelowIsIndifferent || option.AllowedBelow.Contains(belowCell.For.Id);
                            return belowCellSaysOk && optionSaysOk;
                        })
                        //look above
                        .Where(option =>
                        {
                            //dak/optopper
                            if (rowIndex + option.RowSpan == height)
                            {
                                return option.AboveIsIndifferent || option.EmptySpaceAllowedAbove;
                            }

                            var occupiedAbove = grid.GetOccupiedAbove(columnIndex, rowIndex);
                            var optionSaysOk = option.AboveIsIndifferent || option.AllowedAbove.Any();
                            var aboveSaysOk = true;
                            if (occupiedAbove is not null)
                            {
                                aboveSaysOk = occupiedAbove.BelowIsIndifferent || occupiedAbove.AllowedBelow.Contains(option.For.Id);
                                optionSaysOk = option.AboveIsIndifferent || option.AllowedAbove.Contains(occupiedAbove.For.Id);
                            }
                            return aboveSaysOk && optionSaysOk;
                        });

                    var optionsList = options.ToList();
                    if (!optionsList.Any())
                    {
                        return false;
                    }

                    var index = random.Next(optionsList.Count);
                    var selected = optionsList[index];
                    grid.Get(columnIndex, rowIndex).OriginFor = selected;
                    for (int x = 0; x < selected.ColumnSpan; x++)
                    {
                        for (int y = 0; y < selected.RowSpan; y++)
                        {
                            grid.Get(columnIndex + x, rowIndex + y).OccupiedBy = selected;
                        }
                    }
                }
            }

            return true;
        }
    }
}
