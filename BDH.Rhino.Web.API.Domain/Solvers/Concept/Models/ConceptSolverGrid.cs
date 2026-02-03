using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Solvers.Concept
{
    public class ConceptSolverGrid
    {
        private ConceptSolverGridCell[,] grid;
        private readonly int width;
        private readonly int height;

        public ConceptSolverGrid(int width, int height)
        {
            this.width = width;
            this.height = height;

            grid = new ConceptSolverGridCell[height, width];
            for (int columnIndex = 0; columnIndex < width; columnIndex++)
            {
                for (int rowIndex = 0; rowIndex < height; rowIndex++)
                {
                    grid[rowIndex, columnIndex] = new ConceptSolverGridCell();
                }
            }
        }

        public IEnumerable<ConceptSolverGridCell> EnumerateCellsForEachColumn()
        {
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    yield return Get(x, y);
                }
            }
        }

        public void IterateColumCells(Action<int, int, ConceptSolverGridCell> onCell)
        {
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    onCell(x, y, Get(x, y));
                }
            }
        }

        public IEnumerable<IEnumerable<ConceptSolverGridCell>> IterateColums()
        {
            for (int x = 0; x < width; x++)
            {
                yield return IterateColumn(x);
            }
        }

        public IEnumerable<ConceptSolverGridCell> IterateColumn(int x)
        {
            for (int y = 0; y < height; y++)
            {
                yield return Get(x, y);
            }
        }

        public ConceptSolverGridCell Get(int x, int y)
        {
            return grid[y, x];
        }

        public BuildingConceptConfiguration GetOccupiedLeft(int x, int y)
        {
            return grid[y, x - 1].OccupiedBy!;
        }

        public BuildingConceptConfiguration GetOccupiedBelow(int x, int y)
        {
            return grid[y - 1, x].OccupiedBy!;
        }

        public BuildingConceptConfiguration GetOccupiedAbove(int x, int y)
        {
            return grid[y + 1, x].OccupiedBy!;
        }
    }
}
