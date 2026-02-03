namespace BDH.Rhino.Web.Extensions
{
    public class PMCModelViewerColumn
    {
        private readonly PMC_Version pmcVersion;


        public string PMCVersion => pmcVersion switch
        {
            PMC_Version.PMC11 => "PMC 11",
            PMC_Version.PMC12 => "PMC 12",
            PMC_Version.PMC13 => "PMC 13",
            PMC_Version.PMC14 => "PMC 14",
            _ => throw new NotSupportedException("Unknown PMC Version during serialization.")
        };


        public PMCModelViewerColumn(PMC_Version pmcVersion)
        {
            this.pmcVersion = pmcVersion;
        }
    }
}