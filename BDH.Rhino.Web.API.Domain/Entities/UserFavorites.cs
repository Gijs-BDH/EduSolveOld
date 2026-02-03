namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class UserFavorite
    {
        public Guid Id { get; set; }
        public User User { get; set; } = null!;
        public BuildingConcept Bouwconcept { get; set; } = null!;
    }
}
