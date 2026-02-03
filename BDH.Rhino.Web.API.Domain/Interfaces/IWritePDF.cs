namespace BDH.Rhino.Web.API.Domain.Interfaces
{
    public interface IWritePDF
    {
        void DefineCover(string title, string subTitle);
        void AddPageBreak();
        void DefineBackgroundImage();
        void AddText(string line, string style = "");
        void RenderDocument();
        ITable AddTable(int width);
        void AddRow(ITable table, params string[] value);
        byte[] Contents();
    }
}
