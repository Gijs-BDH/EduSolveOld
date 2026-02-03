namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class UserAssetJson : BaseSerializable<UserAssetJson>
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FileLocation { get; set; }
        public TransformJson Transform { get; set; }
    }
}
