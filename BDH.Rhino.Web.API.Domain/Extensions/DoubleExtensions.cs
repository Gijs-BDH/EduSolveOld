namespace BDH.Rhino.Web.API.Domain.Extensions
{
    public static class DoubleExtensions
    {
        public static bool IsInRange(this double value, double min, bool minInclusive, double max, bool maxInclusive)
        {
            var minValid = minInclusive ?
                value >= min : value > min;
            var maxValid = maxInclusive ?
                value <= max : value < max;
            return minValid && maxValid;
        }

        public static double Map(this double x, double sourceMin, double sourceMax, double targetMin, double targetMax)
        {
            return (x - sourceMin) * (targetMax - targetMin) / (sourceMax - sourceMin) + targetMin;
        }

        public static bool AlmostZero(this double x)
        {
            return Math.Abs(x) < 0.0001;
        }

        public static bool AlmostEqual(this double x, double y)
        {
            return (x - y).AlmostZero();
        }
    }
}
