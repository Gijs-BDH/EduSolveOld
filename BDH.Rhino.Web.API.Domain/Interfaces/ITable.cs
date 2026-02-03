namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface ITable
    {
        void AddRow(params string[] values);
    }
}
