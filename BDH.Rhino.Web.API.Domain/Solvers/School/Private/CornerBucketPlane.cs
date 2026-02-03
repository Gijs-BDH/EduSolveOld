using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using System.Collections;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class CornerBucketPlane : IEnumerable<CornerBucketRow>
    {
        private readonly List<CornerBucketRow> rows = new List<CornerBucketRow>();

        public double Z { get; }

        public CornerBucketPlane(double z)
        {
            Z = z;
        }

        public void FindOrIncrement(IXY point, SearchDirection searchDirection)
        {
            var row = rows.FirstOrDefault(r => r.X.AlmostEqual(point.X));
            if (row is null)
            {
                row = new CornerBucketRow(point.X);
                rows.Add(row);
            }

            row.FindOrIncrement(point, searchDirection);
        }

        public IEnumerator<CornerBucketRow> GetEnumerator()
        {
            return ((IEnumerable<CornerBucketRow>)rows).GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)rows).GetEnumerator();
        }
    }
}
