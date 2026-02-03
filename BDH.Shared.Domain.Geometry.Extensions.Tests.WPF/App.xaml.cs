using BDH.Rhino.Web.API.Domain.Solvers.CityPatterns;
using System;
using System.Windows;

namespace BDH.Shared.Domain.Geometry.Extensions.Tests.WPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            var random = new Random();
            var urbanFabric = new Boston();
            var geometry = Rhino.Web.API.Proxy.Geometry.CreateDefault();
            var solver = new CityPatternsSolver(geometry);

            var polygonData = "[{X: -799, Y:1861},{X: -995, Y:1722},{X: -886, Y:1604},{X: -683, Y:1748},{X: -799, Y:1861}]";
            var polygonPoints = geometry.PointCollectionSerializer.FromString(polygonData);
            var polygon = geometry.Polygon(polygonPoints);

            var window = new MainWindow(geometry, polygon, solver, urbanFabric, random);
            window.Show();
        }
    }
}
