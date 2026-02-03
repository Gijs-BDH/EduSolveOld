using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;
using BDH.Rhino.Web.API.Domain.Solvers.School;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;
using BDH.Rhino.Web.API.Proxy;
using BDH.Rhino.Web.API.Proxy.Private;

namespace BDH.Rhino.Web.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddGeometry(this IServiceCollection services)
        {
            services.AddSingleton<ILine2dFactory, BdhLine2dFactory>();
            services.AddSingleton<IPoint2dFactory, BdhPoint2dFactory>();
            services.AddSingleton<IPoint3dFactory, BdhPoint3dFactory>();
            services.AddSingleton<IVector2dFactory, BdhVector2dFactory>();
            services.AddSingleton<IVector3dFactory, BdhVector3dFactory>();
            services.AddSingleton<IPolygon2dFactory, BdhPolygon2dFactory>();
            services.AddSingleton<IColorRgbFactory, ColorRgbFactory>();

            services.AddSingleton<IPoint2dCollectionSerializer, Point2dCollectionSerializer>();
            services.AddSingleton<IPolylineCollectionSerializer, Point2dCollectionCollectionSerializer>();
            services.AddSingleton<IPoint2dSerializer, Point2dSerializer>();
            services.AddSingleton<IColorRgbSerialier, ColorRgbSerializer>();

            services.AddSingleton<IGeometry, Geometry>();

            return services;
        }


        public static IServiceCollection AddSolvers(this IServiceCollection services)
        {
            services.AddSingleton<SchoolSolverFactory>();
            services.AddTransient(s => s.GetRequiredService<SchoolSolverFactory>().CreateSolver());
            services.AddTransient(s => s.GetRequiredService<SchoolSolverFactory>().CreateBulkSolver());
            services.AddTransient(s => s.GetRequiredService<SchoolSolverFactory>().CreateFacadeBuilder());
            services.AddTransient(s => s.GetRequiredService<SchoolSolverFactory>().CreateCornerFinder());

            services.AddSingleton<TilePopulatorSolverFactory>();
            services.AddTransient(s => s.GetRequiredService<TilePopulatorSolverFactory>().CreateSolver());
            services.AddTransient(s => s.GetRequiredService<TilePopulatorSolverFactory>().CreateBulkSolver());
            services.AddTransient(s => s.GetRequiredService<TilePopulatorSolverFactory>().CreateLineSolver());

            services.AddSingleton<ConceptSolverFactory>();
            services.AddTransient(s => s.GetRequiredService<ConceptSolverFactory>().Create());

            return services;
        }
    }
}
