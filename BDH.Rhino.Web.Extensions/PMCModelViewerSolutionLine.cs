using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.Extensions
{
    public class PMCModelViewerSolutionLine
    {
        private readonly IEnumerable<PMCModelViewerSolutionBlock> blocks;
        private readonly IPoint2d origin;
        private readonly IVector2d lineDirection;


        public IEnumerable<PMCModelViewerSolutionBlock> Blocks => blocks;
        public IPoint2d Origin => origin.Scalar(100);
        public IVector2d LineDirection => lineDirection;


        public PMCModelViewerSolutionLine(IEnumerable<PMCModelViewerSolutionBlock> blocks, IPoint2d origin, IVector2d lineDirection)
        {
            this.blocks = blocks;
            this.origin = origin;
            this.lineDirection = lineDirection;
        }
    }
}