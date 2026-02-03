using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.CityPatterns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Windows;
using System.Windows.Media;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace BDH.Shared.Domain.Geometry.Extensions.Tests.WPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly IGeometry geometry;
        private readonly IPolygon2d polygon;
        private readonly CityPatternsSolver solver;
        private readonly BaseUrbanFabric urbanFabric;
        private readonly Random random;
        private bool hasError = false;
        private readonly DispatcherTimer timer;


        public MainWindow(IGeometry geometry, IPolygon2d polygon, CityPatternsSolver solver, BaseUrbanFabric urbanFabric, Random random)
        {         
            InitializeComponent();
            this.geometry = geometry;
            this.polygon = polygon;
            this.solver = solver;
            this.urbanFabric = urbanFabric;
            this.random = random;

            timer = new DispatcherTimer
            {
                Interval = TimeSpan.FromMilliseconds(1000)
            };
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void Timer_Tick(object? sender, EventArgs e)
        {
            _Canvas.Children.Clear();

            var result = solver.Solve(polygon, urbanFabric, random);

            var centerOfPolygon = polygon.EnumeratePoints().Average(geometry);
            var centerScreen = geometry.Point2D(500, 500);
            var toZero = centerOfPolygon.To(centerScreen);

            var splitPolygons = new List<IPolygon2d>() { polygon.Translate(toZero) };
            foreach (var splitter in result.Select(p => p.Translate(toZero)).Select(s => s.Inflate(5).First()))
            {
                _Canvas.Children.Add(splitter.ToPolygon(Brushes.Teal));

                for (var i = 0; i < splitPolygons.Count; i++)
                {
                    if (i > 100)
                    {
                        hasError = true;
                        break;
                    }
                    try
                    {
                        var split = splitter.Subtract(splitPolygons[i].EnsureClosed()).ToArray();
                        if (split.ElementAtOrDefault(1) is not null)
                        {
                            splitPolygons.RemoveAt(i);
                            splitPolygons.AddRange(split);
                            i--;
                        }
                    }
                    catch
                    {
                        //.. fail silently
                    }
                }
            }

            //foreach (var split in splitPolygons)
            //{
            //    _Canvas.Children.Add(split.ToPolygon(Brushes.Teal));
            //}

            foreach (var line in result)
            {
                _Canvas.Children.Add(line.Translate(toZero).ToPolygon());
            }

            if (hasError)
            {
                timer.Stop();
            }
        }
    }



    public static class PolygonExtensions
    {
        public static UIElement ToPolygon(this IPolygon2d polygon, Brush? fill = null, double thickness = 0.1)
        {
            fill ??= Brushes.Transparent;

            UIElement myPolygon = polygon.IsClosed() ? 
                new System.Windows.Shapes.Polygon
                {
                    Points = new PointCollection(polygon.EnumeratePoints().Select(p => new Point(p.X, p.Y))),
                    Fill = fill,
                    Stroke = Brushes.Black,
                    StrokeThickness = thickness
                } : 
                new System.Windows.Shapes.Polyline()
                {
                    Points = new PointCollection(polygon.EnumeratePoints().Select(p => new Point(p.X, p.Y))),
                    Fill = fill,
                    Stroke = Brushes.Black,
                    StrokeThickness = thickness
                };
            return myPolygon;
        }

        public static UIElement ToLine(this ILine2d line)
        {
            var myLine = new System.Windows.Shapes.Line
            {
                Stroke = Brushes.Black,
                X1 = line.Start.X,
                X2 = line.End.X,
                Y1 = line.Start.Y,
                Y2 = line.End.Y,
                StrokeThickness = 1
            };
            return myLine;
        }

        public static UIElement ToPoint(this IPoint2d point)
        {
            var ellipse = new Rectangle()
            {
                Width = 10,
                Height = 10,
                Fill = Brushes.Red,
                HorizontalAlignment = HorizontalAlignment.Left,
                VerticalAlignment = VerticalAlignment.Top,
                Margin = new Thickness(point.X, point.Y, 0, 0)
            };

            return ellipse;
        }
    }
}
