using System.ComponentModel.DataAnnotations;

namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConceptGeometry
    {
        [Key]
        public Guid Id { get; set; }
        public byte[] Data { get; set; } = Array.Empty<byte>();
    }
}
