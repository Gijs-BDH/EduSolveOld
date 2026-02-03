using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Serializers;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BDH.Rhino.Web.API.Data
{
    public class BDHRhinoWebContext : DbContext
    {
        private readonly IPoint2dCollectionSerializer point2DCollectionSerializer;
        private readonly IColorRgbSerialier colorSerializer;

        public BDHRhinoWebContext(DbContextOptions<BDHRhinoWebContext> options, IPoint2dCollectionSerializer point2DCollectionSerializer, IColorRgbSerialier colorSerializer)
            : base(options)
        {
            this.point2DCollectionSerializer = point2DCollectionSerializer;
            this.colorSerializer = colorSerializer;
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model
                .GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?)))
            {
                property.SetPrecision(18);
                property.SetScale(2);
            }

            modelBuilder
                .Entity<SchoolProject>()
                .Property(p => p.BasePolygon)
                .HasConversion(
                    v => point2DCollectionSerializer.ToString(v),
                    v => point2DCollectionSerializer.FromString(v));

            modelBuilder
                .Entity<SchoolProjectVersion>()
                .Property(p => p.Obstacles)
                .HasConversion(
                    v => point2DCollectionSerializer.ToString(v),
                    v => point2DCollectionSerializer.FromString(v));

            modelBuilder
                .Entity<SchoolProjectVersionCluster>()
                .Property(p => p.FixedPoints)
                .HasConversion(
                    v => point2DCollectionSerializer.ToString(v),
                    v => point2DCollectionSerializer.FromString(v));

            modelBuilder
                .Entity<SchoolProjectVersionCluster>()
                .Property(p => p.Color)
                .HasConversion(
                    v => colorSerializer.ToString(v),
                    v => colorSerializer.FromString(v));

            var serializerOptions = new JsonSerializerOptions();
            modelBuilder
                .Entity<BuildingConceptConfiguration>()
                .Property(p => p.AllowedAbove)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, serializerOptions),
                    v => JsonSerializer.Deserialize<ICollection<Guid>>(v, serializerOptions)!);

            modelBuilder
                .Entity<BuildingConceptConfiguration>()
                .Property(p => p.AllowedBelow)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, serializerOptions),
                    v => JsonSerializer.Deserialize<ICollection<Guid>>(v, serializerOptions)!);

            modelBuilder
                .Entity<BuildingConceptConfiguration>()
                .Property(p => p.AllowedLeft)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, serializerOptions),
                    v => JsonSerializer.Deserialize<ICollection<Guid>>(v, serializerOptions)!);

            modelBuilder
                .Entity<BuildingConceptConfiguration>()
                .Property(p => p.AllowedRight)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, serializerOptions),
                    v => JsonSerializer.Deserialize<ICollection<Guid>>(v, serializerOptions)!);

            modelBuilder
                .Entity<SchoolProjectVersionCluster>()
                .Property(p => p.Shape)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, serializerOptions),
                    v => string.IsNullOrWhiteSpace(v) ? new bool[0] : JsonSerializer.Deserialize<bool[]>(v, serializerOptions)!);


            modelBuilder.Entity<SchoolProjectVersionCluster>()
                .Property(e => e.Connections)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }



        public DbSet<Company>? Companies { get; set; }
        public DbSet<User>? Users { get; set; }


        public DbSet<Project>? Projects { get; set; }
        public DbSet<ProjectVersion>? ProjectVersions { get; set; }
        public DbSet<BuildingConceptTransformationEntity>? BuildingConceptTransformations { get; set; }
        public DbSet<GenericMassTransformationEntity>? GenericMassTransformations { get; set; }
        public DbSet<BuildingConceptCatalogTransformation>? BuildingConceptCatalogTransformations { get; set; }


        public DbSet<BuildingConceptCatalog>? BuildingConceptCatalogs { get; set; }
        public DbSet<BuildingConceptConfiguration>? BuildingConceptConfigurations { get; set; }
        public DbSet<BuildingConcept>? Bouwconcepten { get; set; }
        public DbSet<BuildingConceptGeometry>? BouwconceptGeometries { get; set; }
        public DbSet<UserFavorite>? UserFavorites { get; set; }


        public DbSet<SchoolProject>? SchoolProjects { get; set; }
        public DbSet<SchoolProjectVersion>? SchoolProjectVersions { get; set; }
        public DbSet<SchoolProjectVersionCluster>? SchoolProjectVersionClusters { get; set; }


        public DbSet<ConstructionConcept> ConstructionConcepts { get; set; }
        public DbSet<ConstructionConceptProducer> ConstructionConceptProducers { get; set; }



        public IEnumerable<BuildingConcept> EnumerateBouwconceptenForUser(string email, bool includeGeometry)
        {
            var userEntity = Users!.Include(u => u.Company).FirstOrDefault(u => u.EmailAdress == email);
            if (userEntity is null)
            {
                return new List<BuildingConcept>();
            }

            var company = userEntity.Company;
            var userConcepten = includeGeometry ?
                Bouwconcepten!
                    .Include(c => c.Geometry)
                    .Include(c => c.Owner)
                    .Include(c => c.CreatedBy)
                    .Where(c => !c.IsPrivate || c.Owner.Name == company.Name) :
                Bouwconcepten!
                    .Include(c => c.Owner)
                    .Include(c => c.CreatedBy)
                    .Where(c => !c.IsPrivate || c.Owner.Name == company.Name);

            return userConcepten;
        }

        public IEnumerable<BuildingConcept> EnumerateBouwconceptenAnonymous(bool includeGeometry)
        {
            var userConcepten = includeGeometry ?
                 Bouwconcepten!
                    .Include(c => c.Geometry)
                    .Include(c => c.Owner)
                    .Include(c => c.CreatedBy)
                    .Where(c => !c.IsPrivate) :
                Bouwconcepten!
                    .Include(c => c.Owner)
                    .Include(c => c.CreatedBy)
                    .Where(c => !c.IsPrivate);

            return userConcepten;
        }

        public IEnumerable<BuildingConceptConfiguration> GetConfigurations(BuildingConceptCatalog catalog, out double catalogWidth)
        {
            var configurations = new List<BuildingConceptConfiguration>();
            var concepts = catalog.BuildingConcepts.ToList();
            catalogWidth = 0;
            foreach (var concept in concepts)
            {
                var configuration = BuildingConceptConfigurations!
                   .Include(c => c.For)
                   .FirstOrDefault(c => c.For.Id == concept.Id);
                if (configuration is null)
                {
                    continue;
                }

                catalogWidth += concept.Width / configuration.ColumnSpan;
                configurations.Add(configuration);
            }
            catalogWidth /= configurations.Count;
            return configurations;
        }
    }
}
