using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.School.Private;

namespace BDH.Rhino.Web.API.Domain.Solvers.School
{
    public class SchoolSolverFactory
    {
        private readonly IGeometry geometry;

        public SchoolSolverFactory(IGeometry geometry)
        {
            this.geometry = geometry;
        }

        public ISchoolSolver CreateSolver()
        {
            return new SchoolSolver(geometry, 10);
        }

        public ISchoolBulkSolver CreateBulkSolver()
        {
            return new SchoolBulkSolver(CreateSolver());
        }

        public ISchoolCornerFinder CreateCornerFinder()
        {
            return new SchoolCornerFinder(geometry);
        }

        public ISchoolFacadeBuilder CreateFacadeBuilder()
        {
            return new SchoolFacadeBuilder(geometry);
        }
    }
}
