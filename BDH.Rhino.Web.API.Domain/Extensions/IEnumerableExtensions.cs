using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Extensions
{
    public static class IEnumerableExtensions
    {
        public static IEnumerable<T> SkipEveryNth<T>(this IEnumerable<T> enumerable, int nth)
        {
            var index = -1;

            foreach (var value in enumerable)
            {
                index++;

                if (((index + 1) % nth) != 0)
                {
                    yield return value;
                }
            }
        }

        public static IEnumerable<T> SortDefault<T>(this IEnumerable<T> clusters) where T : IOrderableCluster
        {
            return clusters.OrderBy(c => c.LowestLevel).ThenByDescending(c => c.FixedPoints.Count).ThenBy(c => c.HighestLevel).ThenBy(c => c.Name);
        }
    }
}
