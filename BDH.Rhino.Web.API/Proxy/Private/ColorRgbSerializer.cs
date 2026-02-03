using BDH.Rhino.Web.API.Domain.Geometry;
using System.Drawing;

namespace BDH.Rhino.Web.API.Proxy.Private
{
    internal class ColorRgbSerializer : IColorRgbSerialier
    {
        private readonly IColorRgbFactory colorFactory;

        public ColorRgbSerializer(IColorRgbFactory colorFactory)
        {
            this.colorFactory = colorFactory;
        }

        /// <summary>
        /// Assumes #FFFFFF or #FFFFFFFF format
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public IColorRgb FromString(string value)
        {
            var color = ColorTranslator.FromHtml(value);
            return colorFactory.Create(color.R, color.G, color.B);
        }

        public string ToString(IColorRgb geometry)
        {
            var color = Color.FromArgb(geometry.R, geometry.G, geometry.B);
            var @string = ColorTranslator.ToHtml(color);
            return @string;
        }
    }
}
