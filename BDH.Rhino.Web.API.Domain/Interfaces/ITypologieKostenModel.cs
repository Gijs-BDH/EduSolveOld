namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface ITypologieKostenModel
    {
        string ID { get; }
        decimal BvoPerUnit { get; }
        int WoningenPerUnit { get; }
        decimal BasisKostenPerM2BVO { get; }
        decimal MeerprijsBengPerM2BVO { get; }
        decimal MeerprijsEpcPerM2BVO { get; }
        string Name { get; }
        bool IsUserProvided { get; }
        bool MatchName(string other);
    }
}
