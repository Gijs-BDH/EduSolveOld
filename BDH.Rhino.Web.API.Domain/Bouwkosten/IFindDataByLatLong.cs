using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;
using Newtonsoft.Json;

namespace BDH.Rhino.Web.Domain.Interfaces
{
    public class FindProvinceByLatLong : IFindDataByLatLong
    {
        private MultiPolygonFeatureCollectionJson<GemeenteMultiPolygonProperties>? data;

        public async Task<Municiaplity> MostLikelyMunicipality(decimal lat, decimal _long)
        {
            if (NeedsInvalidation())
            {
                await GetData();
            }

            if (data is null)
            {
                throw new Exception("Cannot get data from Nationaal Register");
            }

            var gemeente = data.Features.FirstOrDefault(g => g.Geometry.PointInPolygon(lat, _long));

            var municiaplity = gemeente is null ?
                Municiaplity.Unknown : new Municiaplity(gemeente.Properties.StatNaam, gemeente.Properties.StatCode);

            return municiaplity;
        }

        public async Task<WijkOfBuurt> MostLikelyWijk(decimal lat, decimal _long)
        {
            var municipality = await MostLikelyMunicipality(lat, _long);

            var municipalityName = municipality.Name;

            var url = $@"https://service.pdok.nl/cbs/wijkenbuurten/2021/wfs/v1_0?request=GetFeature&service=WFS&version=1.1.0&outputFormat=application%2Fjson&SRSNAME=EPSG:4326&typeName=cbs_buurten_2021&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Egemeentenaam%3C/PropertyName%3E%3CLiteral%3E{municipalityName}%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E";

            using var client = new HttpClient();

            var response = await client.GetStringAsync(url);

            var jsonObject = JsonConvert.DeserializeObject<MultiPolygonFeatureCollectionJson<WijkOfBuurtPolygonProperties>>(response);

            var guess = jsonObject!.Features.FirstOrDefault(g => g.Geometry.PointInPolygon(lat, _long));

            var answer = guess is null ?
                WijkOfBuurt.Unknown : new WijkOfBuurt(guess.Properties.BuurtNaam, guess.Properties.BuurtCode, guess);

            return answer;

        }

        public async Task GetData()
        {
            using var client = new HttpClient();

            var response = await client.GetStringAsync("https://geodata.nationaalgeoregister.nl/cbsgebiedsindelingen/wfs?OUTPUTFORMAT=json&REQUEST=GetFeature&SERVICE=WFS&SRSNAME=EPSG:4326&TypeName=cbs_gemeente_2021_gegeneraliseerd&VERSION=1.1.0");

            var dynamic = JsonConvert.DeserializeObject<MultiPolygonFeatureCollectionJson<GemeenteMultiPolygonProperties>>(response);

            if (dynamic is null)
            {
                throw new Exception("Response from Nationaal Register not a valid GeoJson feature collection.");
            }

            data = dynamic;
        }

        public bool NeedsInvalidation()
        {
            // plus meer slimme dingen om te weten wanneer de grenzen van gemeenten zijn veranderd. tbd.
            return data is null; ;
        }

        public async Task<int> AverageCostOfSoldHouse(Municiaplity municipality, int year)
        {
            var tableName = "83625NED";

            var select = "*";

            var filter = $"RegioS eq '{municipality.Code}' and startswith(Perioden,'{year}')";

            var url = CreateURL(tableName, select, filter);

            using var client = new HttpClient();

            var response = await client.GetStringAsync(url);

            var _response = JsonConvert.DeserializeObject<HouseValueViewModel>(response);

            return _response!.Value.First().GemiddeldeVerkoopprijs_1;
        }

        public async Task<(int, int)> HousingNumbersStartEndOfYear(Municiaplity municiaplity, int year)
        {
            var tableName = "81955NED";

            var select = "BeginstandVoorraad_1,+EindstandVoorraad_8";

            var filter = $"RegioS eq '{municiaplity.Code}' and Perioden eq '{year}JJ00' and Gebruiksfunctie eq 'A045364'";

            var url = CreateURL(tableName, select, filter);

            using var client = new HttpClient();

            var response = await client.GetStringAsync(url);

            var _response = JsonConvert.DeserializeObject<HousingNumbersTableViewModel>(response);

            return (_response!.Value.First().BeginstandVoorraad_1, _response!.Value.First().EindstandVoorraad_8);
        }

        public async Task<int> AverageHousingFloorArea(Municiaplity municiaplity, int year)
        {
            var tableName = "82550NED";

            var select = "GemiddeldeOppervlakte_2";

            var filter = $"RegioS eq '{municiaplity.Code}' and Perioden eq '{year}JJ00' and Bouwjaarklasse eq 'T001018' and Woningtype eq 'T001100'";

            var url = CreateURL(tableName, select, filter);

            using var client = new HttpClient();

            var response = await client.GetStringAsync(url);

            var _response = JsonConvert.DeserializeObject<HousingFloorAreaNumbersTable>(response);

            return _response!.Value.First().GemiddeldeOppervlakte_2;
        }

        public async Task<AverageWozInWijkOfBuurt> AverageWozWaardeWijkOfBuurt(WijkOfBuurt wijkOfBuurt, int year)
        {
            var tableName = "84799NED";

            var select = "GemiddeldeWOZWaardeVanWoningen_35,+Koopwoningen_40,+InBezitWoningcorporatie_42,+InBezitOverigeVerhuurders_43";

            var filter = $"WijkenEnBuurten eq '{wijkOfBuurt.Code}'";

            var url = CreateURL(tableName, select, filter);

            var client = new HttpClient();

            var response = await client.GetStringAsync(url);

            var _response = JsonConvert.DeserializeObject<AverageWozInWijkOfBuurtTable>(response);

            return _response!.Value.First();
        }


        public string CreateURL(string tableName, string select, string filter)
        {
            var url = @$"https://opendata.cbs.nl/ODataApi/odata/{tableName}/TypedDataSet?";

            if (!string.IsNullOrWhiteSpace(select))
            {
                url += $"&$select={select}";
            }

            if (!string.IsNullOrWhiteSpace(filter))
            {
                url += $"&$filter={filter}";
            }

            return url;
        }

    }
    public interface IFindDataByLatLong
    {
        Task<Municiaplity> MostLikelyMunicipality(decimal lat, decimal _long);

        Task<WijkOfBuurt> MostLikelyWijk(decimal lat, decimal _long);

        Task<int> AverageCostOfSoldHouse(Municiaplity municipality, int year);

        Task<(int, int)> HousingNumbersStartEndOfYear(Municiaplity municiaplity, int year);

        Task<int> AverageHousingFloorArea(Municiaplity municiaplity, int year);

        Task<AverageWozInWijkOfBuurt> AverageWozWaardeWijkOfBuurt(WijkOfBuurt wijkOfBuurt, int year);
    }
}
