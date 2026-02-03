namespace BDH.Shared.Domain.Geometry.Extensions.Private
{
    /// <summary>
    /// These values are used to scale models when using certain operations. Make sure the tolerance is neither too small nor too big or it might cause problems
    /// </summary>
    internal static class BaseGeometryExtensions
    {
        internal static readonly double tolerance = 0.0001;

        internal static readonly double precision = 1 / tolerance;
    }
}