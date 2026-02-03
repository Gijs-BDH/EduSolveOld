namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class GenericMassTransformResponse
    {
        public string BouwkostenTypologie { get; set; } = null!;
        public double LocationX { get; set; }
        public double LocationY { get; set; }
        public double Rotation { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Depth { get; set; }
    }
}
