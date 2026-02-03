using Newtonsoft.Json;

namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public class JsonCollection<TJson>
    {
        public string SerializeToJSON(ICollection<TJson> collection)
        {
            return JsonConvert.SerializeObject(collection);
        }

        public ICollection<TJson> Deserialize(string json)
        {
            ICollection<TJson> request;

            try
            {
                request = JsonConvert.DeserializeObject<ICollection<TJson>>(json);
            }
            catch (Exception ex)
            {
                throw new Exception($"Cannot deserialize string {json} into an array of type {typeof(TJson)}." + Environment.NewLine +
                    $"Exception message: {ex.Message}" + Environment.NewLine +
                    $"Inner exception: {ex.InnerException}");
            }
            finally
            {

            }

            return request;
        }
    }
}
