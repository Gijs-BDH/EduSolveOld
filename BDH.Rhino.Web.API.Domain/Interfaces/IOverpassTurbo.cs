namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface IOverpassTurbo
    {
        string GetUrl(decimal minx, decimal miny, decimal maxx, decimal maxy, int timeout = 180, decimal offset = 0.0005M);
        Task<string> RequestOsmData(string request, int numberOfRetriesOnTimeout);

    }
}
