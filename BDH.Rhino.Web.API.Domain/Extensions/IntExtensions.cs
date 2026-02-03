namespace BDH.Rhino.Web.API.Domain.Extensions
{
    public static class IntExtensions
    {
        public static bool IsInRange(this int value, int min, bool minInclusive, int max, bool maxInclusive)
        {
            var minValid = minInclusive ?
                value >= min : value > min;
            var maxValid = maxInclusive ?
                value <= max : value < max;
            return minValid && maxValid;
        }
    }
}
