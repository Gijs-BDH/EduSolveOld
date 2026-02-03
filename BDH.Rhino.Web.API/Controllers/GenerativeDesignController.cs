using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Solvers.Concept;
using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;
using BDH.Rhino.Web.API.Domain.Solvers.School;
using BDH.Rhino.Web.API.Domain.Solvers.Tile;
using BDH.Rhino.Web.API.Schema.GenerativeDesign;
using BDH.Rhino.Web.API.Solver;
using BDH.Rhino.Web.API.Utilities;
using BDH.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /// <summary>
    /// Controller for all generative design actions
    /// </summary>
    public class GenerativeDesignController : BaseController
    {
        private readonly ISchoolSolver solver;
        private readonly ISchoolBulkSolver bulkSolver;
        private readonly ISchoolFacadeBuilder facadeBuilder;
        private readonly ITileCatalogPopulatorSolver tilePopulator;
        private readonly ITileCatalogPopulatorBulkSolver tileBulkPopulator;
        private readonly ICatalogToLineSolver lineSolver;
        private readonly IConceptConfiguratieSolver conceptSolver;
        private readonly ISchoolCornerFinder cornerFinder;

        public GenerativeDesignController(
            UserUtility userUtility,
            BDHRhinoWebContext context,
            ISchoolSolver solver,
            ISchoolBulkSolver bulkSolver,
            ISchoolFacadeBuilder facadeBuilder,
            ITileCatalogPopulatorSolver tilePopulator,
            ITileCatalogPopulatorBulkSolver tileBulkPopulator,
            ICatalogToLineSolver lineSolver,
            IConceptConfiguratieSolver conceptSolver,
            ISchoolCornerFinder cornerFinder) : base(context, userUtility)
        {
            this.solver = solver;
            this.bulkSolver = bulkSolver;
            this.facadeBuilder = facadeBuilder;
            this.tilePopulator = tilePopulator;
            this.tileBulkPopulator = tileBulkPopulator;
            this.lineSolver = lineSolver;
            this.conceptSolver = conceptSolver;
            this.cornerFinder = cornerFinder;
        }


        /// <summary>
        /// Handles the request to generate a design for a urban-solve tile.
        /// Returns the base lines for the tile and corresponding building concept configurations.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("tile")]
        public IActionResult SolveTileCatalog([FromBody] DesignTileRequestData request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .ThenInclude(u => u.Catalogs)
                .ThenInclude(u => u.BuildingConcepts)
                .First(u => u.EmailAdress == user.EmailAdress);
            var catalog = userEntity.Company.Catalogs.FirstOrDefault(c => c.Id == request.CatalogId);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var configurations = context
                .GetConfigurations(catalog, out var catalogWidth);
            if (!configurations.Any())
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var response = tilePopulator.DrawLinesForCatalogs(request.ToRequest(), request.Seed ?? Random.Shared.Next());
            lineSolver.SolveForConceptConfigurations(ref response, configurations, catalog, catalogWidth);

            return Ok(response);
        }

        /// <summary>
        /// Handles the bulk request for the urban-solve tile design. 
        /// Returns some evaluated data for each run with its corresponding seed.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="solutions"></param>
        /// <returns></returns>
        [HttpPost("tile/bulk")]
        public IActionResult SolveConceptenBulk([FromBody] DesignTileRequestData request, int solutions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .ThenInclude(u => u.Catalogs)
                .ThenInclude(u => u.BuildingConcepts)
                .First(u => u.EmailAdress == user.EmailAdress);
            var catalog = userEntity.Company.Catalogs.FirstOrDefault(c => c.Id == request.CatalogId);
            if (catalog is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var configurations = context.GetConfigurations(catalog, out var catalogWidth);
            if (!configurations.Any())
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var random = Random.Shared;
            var response = tileBulkPopulator.DrawLinesForCatalogsBulk(request.ToRequest(), solutions, random)
                .Select(solution =>
                {
                    lineSolver.SolveForConceptConfigurations(ref solution, configurations, catalog, catalogWidth);
                    return solution;
                })
                .Select(solution =>
                {
                    var numberOfHouses = 0;
                    var lineLengths = 0d;
                    var glassArea = 0d;
                    var bvo = 0d;
                    var volume = 0d;
                    var productieKosten = 0d;
                    foreach (var line in solution.Lines)
                    {
                        lineLengths += line.Line.Length;
                        foreach (var response in line.Solution)
                        {
                            foreach (var row in response.Solution)
                            {
                                foreach (var cell in row)
                                {
                                    if (cell.OriginFor is not null)
                                    {
                                        var bouwconcept = cell.OriginFor.Bouwconcept;
                                        glassArea += bouwconcept.GlazingFactor * (double)bouwconcept.BvoPerUnit;
                                        numberOfHouses += bouwconcept.WoningenPerUnit;
                                        bvo += (double)bouwconcept.BvoPerUnit;
                                        volume += (double)bouwconcept.M3PerUnit;
                                        productieKosten += (double)bouwconcept.ProductieKostenPerUnit;
                                    }
                                }
                            }
                        }
                    }
                    return new
                    {
                        numberOfHouses,
                        lineLengths,
                        glassArea,
                        bvo,
                        productieKosten,
                        volume,
                        seed = solution.UsedSeed
                    };
                });

            return Ok(response);
        }



        /// <summary>
        /// Handles the school generative design request. 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("school")]
        public IActionResult SolveSchool([FromBody] GenerateSchoolRequestData request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var _resquest = request.ToRequest();
            var response = solver.Solve(_resquest);
            facadeBuilder.Build(ref response);
            cornerFinder.Solve(ref response);

            return Ok(response);
        }

        /// <summary>
        /// Handles the bulk school solver request.
        /// Returns some evaluated data from each run with its corresponding seed.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="solutions"></param>
        /// <returns></returns>
        [HttpPost("school/bulk")]
        public IActionResult SolveSchoolBulk([FromBody] GenerateSchoolRequestData request, int solutions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var results = this.bulkSolver
                .Solve(request.ToRequest(), solutions)
                .Select(request =>
                {
                    facadeBuilder.Build(ref request);
                    cornerFinder.Solve(ref request);
                    return request;
                })
                .Select(solution =>
                {
                    var footprint = 0d;
                    var gevel = 0;
                    var height = 0;
                    var bboxMinX = solution.Clusters.Any() ? double.MaxValue : 0;
                    var bboxMaxX = solution.Clusters.Any() ? double.MinValue : 0;
                    var bboxMinY = solution.Clusters.Any() ? double.MaxValue : 0;
                    var bboxMaxY = solution.Clusters.Any() ? double.MinValue : 0;

                    foreach (var cluster in solution.Clusters)
                    {
                        foreach (var cell in cluster.Cells)
                        {
                            if (cell.Point.Z < 0.1)
                            {
                                footprint += (solution.GridSize * solution.GridSize);
                            }

                            bboxMinX = Math.Min(bboxMinX, cell.Point.X - (solution.GridSize / 2));
                            bboxMaxX = Math.Max(bboxMaxX, cell.Point.X + (solution.GridSize / 2));
                            bboxMinY = Math.Min(bboxMinY, cell.Point.Y - (solution.GridSize / 2));
                            bboxMaxY = Math.Max(bboxMaxY, cell.Point.Y + (solution.GridSize / 2));

                            gevel += cell.NorthFacades.Where(g => g).Count();
                            gevel += cell.EastFacades.Where(g => g).Count();
                            gevel += cell.SouthFacades.Where(g => g).Count();
                            gevel += cell.WestFacades.Where(g => g).Count();

                            if (cell.Point.Z + cell.Hoogte > height)
                            {
                                height = (int)Math.Ceiling(cell.Point.Z + cell.Hoogte);
                            }
                        }
                    }
                    var bboxWidth = Math.Abs(bboxMaxX - bboxMinX);
                    var bboxDepth = Math.Abs(bboxMaxY - bboxMinY);
                    var bboxArea = bboxWidth * bboxDepth;
                    var bboxRatio = bboxWidth.IsAlmostEqual(0) || bboxDepth.IsAlmostEqual(0) ? 1 : Math.Max(bboxWidth, bboxDepth) / Math.Min(bboxWidth, bboxDepth);
                    return new
                    {
                        seed = solution.UsedSeed,
                        footprint = footprint,
                        gevel = gevel,
                        corners = solution.NumberOfCorners,
                        height = height,
                        bboxArea = bboxArea,
                        bboxRatio = bboxRatio,
                        deltaFootprint = bboxArea - footprint
                    };
                });

            return Ok(results);
        }


        /// <summary>
        /// Handles the request for a building concept configuration.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("concepten")]
        public IActionResult SolveConcepten([FromBody] ConceptSolverRequestData request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var random = request.Seed.HasValue ? new Random(request.Seed.Value) : new Random();
            var concepts = request.Concepts
                .Select(c =>
                {
                    var id = c.BouwconceptId;
                    var configuration = context.BuildingConceptConfigurations!
                        .Include(b => b.For)
                        .First(d => d.For.Id.ToString() == id);
                    configuration = c.CopyTo(configuration);
                    return configuration;
                })
                .ToArray();
            var _request = new ConceptSolverRequest(concepts,
                request.Width,
                request.HeightFrom,
                request.HeightTo,
                request.AllowedColumnsFrom,
                request.AllowedColumnsTo,
                request.AllowedRowsFrom,
                request.AllowedRowsTo);
            var solution = _request.Split(random).Select(i => conceptSolver.Solve(i, 10, random)).ToArray();

            return Ok(solution);
        }
    }
}
