namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolClusterShapeMatcher
    {
        private readonly SchoolClusterShape shape;
        private readonly SchoolGrid grid;

        public SchoolClusterShapeMatcher(SchoolClusterShape shape, SchoolGrid grid)
        {
            this.shape = shape;
            this.grid = grid;
        }

        public IEnumerable<SchoolGridCell> Match()
        {
            for (int gridY = 0; gridY < grid.Height - (shape.Height - 1); gridY++)
            {
                for (int gridX = 0; gridX < grid.Width - (shape.Width - 1); gridX++)
                {
                    if (MatchAtCoordinate(gridX, gridY))
                    {
                        yield return grid.GetAt(gridX, gridY);
                    }
                }
            }
        }

        public IEnumerable<SchoolGridCell> Match(int gridx, int gridy)
        {
            for (int y = 0; y < shape.Height; y++)
            {
                for (int x = 0; x < shape.Width; x++)
                {
                    if (shape.GetAt(x, y))
                    {
                        yield return grid.GetAt(gridx + x, gridy + y);
                    }
                }
            }
        }

        public bool MatchAtCoordinate(int x, int y)
        {
            for (int shapeX = 0; shapeX < shape.Width; shapeX++)
            {
                for (int shapeY = 0; shapeY < shape.Height; shapeY++)
                {
                    var shapeValue = shape.GetAt(shapeX, shapeY);
                    if (shapeValue)
                    {
                        var gridX = grid.GetAt(x + shapeX, y + shapeY).Available;
                        if (!gridX)
                        {
                            return false;
                        }
                    }
                }
            }

            return true;
        }
    }
}
