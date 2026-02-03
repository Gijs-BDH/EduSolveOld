using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class CornerBucketList
    {
        private readonly List<CornerBucketPlane> planes = new List<CornerBucketPlane>();

        public CornerBucketList()
        {

        }

        public void FindOrIncrement(IXYZ point, SearchDirection searchDirection)
        {
            var plane = planes.LastOrDefault();
            if (plane is null || !plane.Z.AlmostEqual(point.Z))
            {
                plane = new CornerBucketPlane(point.Z);
                planes.Add(plane);
            }

            plane.FindOrIncrement(point, searchDirection);
        }

        public int CalculateCurrentValence()
        {
            var valence = 0;
            foreach (var plane in planes)
            {
                foreach (var row in plane)
                {
                    foreach (var bucket in row)
                    {
                        if (bucket.Valence % 2 == 0)
                        {
                            var specialBucket = bucket.Valence == 2;
                            var opposite = bucket.SearchedFromNorthEast && bucket.SearchedFromSouthWest || bucket.SearchedFromNorthWest && bucket.SearchedFromSouthEast;
                            if (specialBucket && opposite)
                            {
                                valence += 2;
                            }
                        }
                        else
                        {
                            valence++;
                        }
                    }
                }
            }


            return valence;
        }
    }
}
