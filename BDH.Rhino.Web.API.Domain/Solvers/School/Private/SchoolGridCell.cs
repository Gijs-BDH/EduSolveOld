using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolGridCell
    {
        public bool Available { get; set; }
        public int X { get; }
        public int Y { get; }
        public IPoint3d Point { get; }

        public SchoolGridCell(int x, int y, IPoint3d point)
        {
            X = x;
            Y = y;
            Point = point;
        }
    }
}
