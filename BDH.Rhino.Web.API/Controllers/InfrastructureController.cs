using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Converters;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.Tile;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;
using BDH.Rhino.Web.API.Proxy.Private;
using BDH.Rhino.Web.API.Utilities;
using BDH.Rhino.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfrastructureController : BaseController
    {
        private readonly ICatalogToLineSolver lineSolver;
        private readonly IGeometry geometry;

        public InfrastructureController(BDHRhinoWebContext context, UserUtility users, ICatalogToLineSolver tilePopulator, IGeometry geometry) : base(context, users)
        {
            this.lineSolver = tilePopulator;
            this.geometry = geometry;
        }

        [HttpGet("pmc-json")]
        [AllowAnonymous]
        [EnableCors]
        public IActionResult GetPmcConfigurationJson(Guid projectId, Guid versionId)
        {
            var project = context.Projects!
                .Include(p => p.Versions)
                .ThenInclude(v => v.BuildingConceptCatalogTransformations)
                .FirstOrDefault(p => p.Id == projectId.ToString());
            if (project is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var version = project.Versions
                .FirstOrDefault(v => v.Id == versionId.ToString());
            if (version is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var lines = version.BuildingConceptCatalogTransformations
                .Select(t =>
                {
                    var startPoint = geometry.Point2D(t.StartPointX, t.StartPointY);
                    var endPoint = geometry.Point2D(t.EndPointX, t.EndPointY);
                    var line = geometry.Line(startPoint, endPoint);
                    return new CatalogLineOnTile(line, t.UsedSeed);
                }).ToArray();
            var tileDesign = new TileDesign(lines, 0);

            var catalogName = "Demo Concept P";
#if DEBUG
            catalogName = "Concept P";
#endif
            var catalog = context.BuildingConceptCatalogs!
                .Include(c => c.BuildingConcepts)
                .FirstOrDefault(c => c.Name == catalogName);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var configurations = context.GetConfigurations(catalog, out var catalogWidth);
            lineSolver.SolveForConceptConfigurations(ref tileDesign, configurations, catalog, catalogWidth);

            var geoJson = GrasshopperUtil.ToPolygon<EmptyJsonProperties>(project.BasePolygon).Geometry;
            var points = new BdhPolygon2dFactory().FromGeoJson(geoJson).First().EnumeratePoints();
            var json = tileDesign.Lines.Convert(points.First(), geometry);
            return Json(json);
        }
    }
}
