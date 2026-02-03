using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.Extensions
{
    public class PMCModelViewerSolution
    {
        private readonly int numberOfLevels;
        private readonly IEnumerable<PMCModelViewerSolutionLine> lines;
        private readonly IPoint2d origin;

        public IEnumerable<PMCModelViewerSolutionLine> Lines => lines;
        public int NumberOfLevels => numberOfLevels;
        public IPoint2d Origin => origin.Scalar(100);


        public PMCModelViewerSolution(int numberOfLevels, IEnumerable<PMCModelViewerSolutionLine> lines, IPoint2d origin)
        {
            this.numberOfLevels = numberOfLevels;
            this.lines = lines;
            this.origin = origin;
        }
    }
}