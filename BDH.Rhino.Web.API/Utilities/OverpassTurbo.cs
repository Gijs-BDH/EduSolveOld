using BDH.Rhino.Web.API.Domain.Interfaces;
using Microsoft.Net.Http.Headers;

namespace BDH.Rhino.Web.API.Utilities
{
    public class OverpassTurbo : IOverpassTurbo
    {
        private readonly IHttpClientFactory _httpClientFactory;


        public OverpassTurbo(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }



        public async Task<string> RequestOsmData(string request, int numberOfRetriesOnTimeout)
        {
            var httpClient = _httpClientFactory.CreateClient();

            HttpResponseMessage response = null!;

            for (int i = 0; i < numberOfRetriesOnTimeout; i++)
            {
                try
                {
                    var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, request)
                    {
                        Headers =
                        {
                            { HeaderNames.Accept, "application/vnd.github.v3+json" },
                            { HeaderNames.UserAgent, "HttpRequestsSample" }
                        }
                    };

                    response = await httpClient.SendAsync(httpRequestMessage);

                    if (response.StatusCode == System.Net.HttpStatusCode.GatewayTimeout)
                    {
                        continue;
                    }
                    else if (response.StatusCode != System.Net.HttpStatusCode.OK)
                    {
                        throw new Exception();
                    }
                    else
                    {
                        break;
                    }
                }
                catch (TimeoutException)
                {
                    continue;
                }
                catch
                {
                    throw;
                }
            }

            if (response is null)
            {
                throw new Exception();
            }

            var contentStream = await response.Content.ReadAsStringAsync();

            return contentStream;
        }


        //https://wiki.openstreetmap.org/wiki/Overpass_API
        public string GetUrl(decimal minx, decimal miny, decimal maxx, decimal maxy, int timeout, decimal offset)
        {
            var baseUrl = @"https://lz4.overpass-api.de/api/interpreter";

            var baseArguments = $@"?data=[bbox][timeout:{timeout}];(node;way;relation;);(._;>;);out;";

            var bbox = $@"&bbox={(minx - offset).ToString().Replace(",", ".")},{(miny - offset).ToString().Replace(",", ".")},{(maxx + offset).ToString().Replace(",", ".")},{(maxy + offset).ToString().Replace(",", ".")}";

            var url = $@"{baseUrl}{baseArguments}{bbox}";

            return url;
        }
    }
}
