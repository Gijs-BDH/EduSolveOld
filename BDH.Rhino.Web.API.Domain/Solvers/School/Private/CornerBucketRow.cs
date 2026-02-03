using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using System.Collections;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class CornerBucketRow : IEnumerable<CornerBucket>
    {
        private readonly List<CornerBucket> buckets;

        public double X { get; }

        public CornerBucketRow(double x)
        {
            buckets = new List<CornerBucket>();

            X = x;
        }

        public void FindOrIncrement(IXY point, SearchDirection searchDirection)
        {
            var bucket = buckets.FirstOrDefault(b => b.Y.AlmostEqual(point.Y));
            if (bucket is null)
            {
                bucket = new CornerBucket(point.Y);
                buckets.Add(bucket);
            }

            bucket.Increment(searchDirection);
        }

        public IEnumerator<CornerBucket> GetEnumerator()
        {
            return buckets.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
