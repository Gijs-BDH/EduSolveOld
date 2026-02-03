namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface ITypologieKostenModelProvider
    {
        bool Request(string name, out ITypologieKostenModel? model);
    }
}
