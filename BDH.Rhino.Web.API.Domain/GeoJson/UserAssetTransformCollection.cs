namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class UserAssetTransformCollection : BaseSerializable<UserAssetTransformCollection>
    {
        public string Id { get; set; }
        public ICollection<TransformJson> Transformations { get; set; }
    }
}
