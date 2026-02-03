using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Models;
using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    internal class SchoolFacadeBuilder : ISchoolFacadeBuilder
    {
        private readonly IPoint3dFactory pointFactory;

        public SchoolFacadeBuilder(IPoint3dFactory pointFactory)
        {
            this.pointFactory = pointFactory;
        }

        public void Build(ref GeneratedSchoolResponse generatedSchool)
        {
            var pointToleranceX = generatedSchool.GridSize + 0.1;
            var pointToleranceY = generatedSchool.GridSizeY + 0.1;

            var pointcloud = new List<(IPoint3d, GeneratedClusterCellResponse, int)>();

            foreach (var cluster in generatedSchool.Clusters)
            {
                foreach (var cell in cluster.Cells)
                {
                    cell.NorthFacades = Enumerable.Range(0, cell.Hoogte).Select(i => true).ToArray();
                    cell.EastFacades = Enumerable.Range(0, cell.Hoogte).Select(i => true).ToArray();
                    cell.SouthFacades = Enumerable.Range(0, cell.Hoogte).Select(i => true).ToArray();
                    cell.WestFacades = Enumerable.Range(0, cell.Hoogte).Select(i => true).ToArray();

                    for (int i = 0; i < cell.Hoogte; i++)
                    {
                        var z = cell.Point.Z + i;
                        pointcloud.Add((pointFactory.Point3D(cell.Point.X, cell.Point.Y, z), cell, i));
                    }
                }
            }

            var planes = pointcloud.GroupBy(p => p.Item1.Z).ToList();

            foreach (var plane in planes)
            {
                var rows = plane.GroupBy(p => p.Item1.Y).ToList();
                for (int i = 0; i < rows.Count; i++)
                {
                    var row = rows[i].OrderBy(i => i.Item1.X).ToList();
                    for (int j = 0; j < row.Count; j++)
                    {
                        var cell = row[j];
                        cell.Item2.EastFacades[cell.Item3] = true;
                        cell.Item2.WestFacades[cell.Item3] = true;

                        if (j != 0)
                        {
                            var cellLeft = row[j - 1];
                            if (Math.Abs(cell.Item1.X - cellLeft.Item1.X) < pointToleranceX)
                            {
                                cellLeft.Item2.EastFacades[cellLeft.Item3] = false;
                                cell.Item2.WestFacades[cell.Item3] = false;
                            }
                        }

                        if (j != row.Count - 1)
                        {
                            var cellRight = row[j + 1];
                            if (Math.Abs(cell.Item1.X - cellRight.Item1.X) < pointToleranceX)
                            {
                                cell.Item2.EastFacades[cell.Item3] = false;
                                cellRight.Item2.WestFacades[cellRight.Item3] = false;
                            }
                        }
                    }
                }

                var colums = plane.GroupBy(p => p.Item1.X).ToList();
                for (int i = 0; i < colums.Count; i++)
                {
                    var column = colums[i].OrderBy(p => p.Item1.Y).ToList();
                    for (int j = 0; j < column.Count; j++)
                    {
                        var cell = column[j];
                        cell.Item2.NorthFacades[cell.Item3] = true;
                        cell.Item2.SouthFacades[cell.Item3] = true;

                        if (j != 0)
                        {
                            var cellBottom = column[j - 1];

                            if (Math.Abs(cell.Item1.Y - cellBottom.Item1.Y) < pointToleranceY)
                            {
                                cellBottom.Item2.NorthFacades[cellBottom.Item3] = false;
                                cell.Item2.SouthFacades[cell.Item3] = false;
                            }
                        }

                        if (j != column.Count - 1)
                        {
                            var cellTop = column[j + 1];

                            if (Math.Abs(cell.Item1.Y - cellTop.Item1.Y) < pointToleranceY)
                            {
                                cell.Item2.NorthFacades[cell.Item3] = false;
                                cellTop.Item2.SouthFacades[cellTop.Item3] = false;
                            }
                        }
                    }
                }
            }
        }
    }
}
