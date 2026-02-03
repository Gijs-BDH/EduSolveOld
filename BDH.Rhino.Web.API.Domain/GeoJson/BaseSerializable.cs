using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BDH.Rhino.Web.API.Domain.GeoJson
{
    public abstract class BaseSerializable<TTarget>
    {
        public string SerializeToJSON()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented, new JsonSerializerSettings()
            {
                ContractResolver = new DefaultContractResolver()
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                }
            });
        }

        public TTarget Deserialize(string json)
        {
            TTarget request;

            try
            {
                request = JsonConvert.DeserializeObject<TTarget>(json);
            }
            catch (Exception ex)
            {
                throw new Exception($"Cannot deserialize string {json} into type {typeof(TTarget)}." + Environment.NewLine +
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
