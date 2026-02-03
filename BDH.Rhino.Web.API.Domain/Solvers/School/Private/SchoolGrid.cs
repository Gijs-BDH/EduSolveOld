using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolGrid
    {
        private readonly SchoolGridCell[,] cells;

        public int Width => cells.GetLength(1);
        public int Height => cells.GetLength(0);

        private SchoolGrid(SchoolGridCell[,] cells)
        {
            this.cells = cells;
        }

        public static SchoolGrid FromPoints(ICollection<IPoint3d> points, double distanceX, double distanceY, IGeometry geometry)
        {
            var pointsOrderedByX = points.OrderBy(p => p.X).ThenBy(p => p.Y).ToArray();
            var minX = pointsOrderedByX.First().X;
            var maxX = pointsOrderedByX.Last().X;

            var pointsOrderedByY = points.OrderBy(p => p.Y).ThenBy(p => p.X).ToArray();
            var minY = pointsOrderedByY.First().Y;
            var maxY = pointsOrderedByY.Last().Y;

            var nx = (int)Math.Round((maxX - minX) / distanceX) + 1;
            var ny = (int)Math.Round((maxY - minY) / distanceY) + 1;
            var cells = new SchoolGridCell[ny, nx];
            var posY = minY;
            for (int y = 0; y < ny; y++)
            {
                var posX = minX;
                for (int x = 0; x < nx; x++)
                {
                    var point = geometry.Point3D(posX, posY, 0);
                    var pointInCollection = points.Any(p => p.DistanceTo(geometry.Point3D(point.X, point.Y, 0)) < 0.1);
                    var cell = new SchoolGridCell(x, y, point)
                    {
                        Available = pointInCollection
                    };
                    cells[y, x] = cell;
                    posX += distanceX;
                }
                posY += distanceY;
            }

            return new SchoolGrid(cells);
        }

        public SchoolGridCell GetAt(int x, int y)
        {
            return cells[y, x];
        }
    }
}
