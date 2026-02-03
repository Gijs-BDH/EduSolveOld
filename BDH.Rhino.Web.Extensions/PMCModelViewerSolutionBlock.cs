namespace BDH.Rhino.Web.Extensions
{
    public class PMCModelViewerSolutionBlock
    {
        private readonly IEnumerable<PMCModelViewerColumn> columns;


        public IEnumerable<PMCModelViewerColumn> Columns => columns;
        public double Margin => 300;

        public PMCModelViewerSolutionBlock(IEnumerable<PMCModelViewerColumn> columns)
        {
            this.columns = columns;
        }
    }
}