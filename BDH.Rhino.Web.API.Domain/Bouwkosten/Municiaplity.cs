namespace BDH.Rhino.Web.Domain.Interfaces
{
    public class Municiaplity
    {
        public static Municiaplity Unknown { get; } = new Municiaplity("Unknwon", "Unknown");

        public string Name { get; } = null!;
        public string Code { get; } = null!;


        public Municiaplity(string name, string code)
        {
            Name = name;
            Code = code;
        }
    }
}
