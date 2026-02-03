//using System.Text.Json;
//using System.Text.Json.Serialization;
//using BDH.Rhino.Web.API.Domain.GeoJson.Converters;

//namespace BDH.Rhino.Web.API.Domain.Bouwkosten
//{

//    public class BouwkostenOverzichtModel
//    {
//        [JsonPropertyName("Typologieen")]
//        public List<Typologie> Typologieen { get; set; }

//        [JsonPropertyName("Totale Bouwkosten")]
//        public List<TotaleBouwkosten> TotaleBouwkosten { get; set; }

//        [JsonPropertyName("Honoratia")]
//        public List<Honoratia> Honoratia { get; set; }

//        [JsonPropertyName("Heffingen Aansluitkosten en Verzekeringen")]
//        public List<HeffingenAansluitkostenEnVerzekeringen> HeffingenAansluitkostenEnVerzekeringen { get; set; }

//        [JsonPropertyName("Aanloop en Afzetkosten")]
//        public List<AanloopEnAfzetkosten> AanloopEnAfzetkosten { get; set; }

//        [JsonPropertyName("Financiering en Peildatumverschuiving")]
//        public List<FinancieringEnPeildatumverschuiving> FinancieringEnPeildatumverschuiving { get; set; }

//        [JsonPropertyName("Project Ontwikkeling")]
//        public List<ProjectOntwikkeling> ProjectOntwikkeling { get; set; }

//        [JsonPropertyName("Locatie Factoren")]
//        public List<LocatieFactoren> LocatieFactoren { get; set; }



//        public BouwkostenOverzichtModel()
//        {
//            Typologieen = new List<Typologie>();
//            TotaleBouwkosten = new List<TotaleBouwkosten>();
//            Honoratia = new List<Honoratia>();
//            HeffingenAansluitkostenEnVerzekeringen = new List<HeffingenAansluitkostenEnVerzekeringen>();
//            AanloopEnAfzetkosten = new List<AanloopEnAfzetkosten>();
//            FinancieringEnPeildatumverschuiving = new List<FinancieringEnPeildatumverschuiving>();
//            ProjectOntwikkeling = new List<ProjectOntwikkeling>();
//            LocatieFactoren = new List<LocatieFactoren>();
//        }

//        public static BouwkostenOverzichtModel? Deserialize(string jsonContent, out string error)
//        {
//            error = string.Empty;

//            var clean = jsonContent.Replace("  ", " ");

//            try
//            {
//                var options = new JsonSerializerOptions()
//                {
//                    NumberHandling = JsonNumberHandling.WriteAsString
//                };

//                options.Converters.Add(new StringConverter());

//                BouwkostenOverzichtModel? model = JsonSerializer.Deserialize<BouwkostenOverzichtModel>(clean, options);

//                return model;
//            }
//            catch (Exception ex)
//            {
//                error = ex.Message;
//                return null;
//            }
//        }
//        public string Serialize()
//        {
//            var options = new JsonSerializerOptions()
//            {
//                WriteIndented = true
//            };

//            return JsonSerializer.Serialize(this, options);
//        }
//    }

//    public class Typologie
//    {
//        [JsonPropertyName("Type")]
//        public string Type { get; set; } = string.Empty;

//        [JsonPropertyName("Som Footprint")]
//        public string SumFootprint { get; set; } = string.Empty;

//        [JsonPropertyName("Som BVO")]
//        public string SumBVO { get; set; } = string.Empty;

//        [JsonPropertyName("Gebruiksoppervlakte / m2 BVO")]
//        public string Gebruiksoppervlakte { get; set; } = string.Empty;

//        [JsonPropertyName("Som Gebruiksoppervlakte")]
//        public string SomGebruiksoppevlakte { get; set; } = string.Empty;

//        [JsonPropertyName("Bouwkosten / m2 Gebruiksoppervlakte")]
//        public string BouwkostenPerGebruiksoppervlakte { get; set; } = string.Empty;

//        [JsonPropertyName("Bouwkosten Totaal")]
//        public string SomBouwkosten { get; set; } = string.Empty;
//    }

//    public class TotaleBouwkosten
//    {
//        [JsonPropertyName("Bouwkosten")]
//        public string Bouwkosten { get; set; } = string.Empty;

//        [JsonPropertyName("Kosten BENG")]
//        public string KostenBENG { get; set; } = string.Empty;

//        [JsonPropertyName("Kosten EPC")]
//        public string KostenEPC { get; set; } = string.Empty;
//    }

//    public class Honoratia
//    {
//        [JsonPropertyName("Architect")]
//        public string Architect { get; set; } = string.Empty;

//        [JsonPropertyName("Stedenbouwkundige")]
//        public string Stedenbouwkundige { get; set; } = string.Empty;

//        [JsonPropertyName("Interieur")]
//        public string Interieur { get; set; } = string.Empty;

//        [JsonPropertyName("Constructeur")]
//        public string Constructeur { get; set; } = string.Empty;

//        [JsonPropertyName("Adviseur installaties")]
//        public string AdviseurInstallatie { get; set; } = string.Empty;

//        [JsonPropertyName("Bouwfysica / duurzaamheid")]
//        public string BouwfysicaEnDuurzaamheid { get; set; } = string.Empty;

//        [JsonPropertyName("Projectmanagement")]
//        public string ProjectManagement { get; set; } = string.Empty;

//        [JsonPropertyName("Kostenmanagement")]
//        public string KostenManagement { get; set; } = string.Empty;

//        [JsonPropertyName("Toezicht tijdens de bouw")]
//        public string ToezichtBouw { get; set; } = string.Empty;

//        [JsonPropertyName("Overige adviseurs")]
//        public string OverigeAdviseurs { get; set; } = string.Empty;
//    }

//    public class HeffingenAansluitkostenEnVerzekeringen
//    {
//        [JsonPropertyName("Leges en aansluitkosten")]
//        public string LegesEnAansluitkosten { get; set; } = string.Empty;

//        [JsonPropertyName("Verzekeringen opdrachtgever")]
//        public string VerzekeringenOpdrachtgever { get; set; } = string.Empty;
//    }

//    public class AanloopEnAfzetkosten
//    {
//        [JsonPropertyName("brochures, advertenties en reclamekosten")]
//        public string BrochuresAdvertentiesEnReclame { get; set; } = string.Empty;

//        [JsonPropertyName("Bemiddelings- en makelaarskosten")]
//        public string BemidelaarEnMakelaar { get; set; } = string.Empty;

//        [JsonPropertyName("Notaris kosten")]
//        public string Notaris { get; set; } = string.Empty;
//    }

//    public class FinancieringEnPeildatumverschuiving
//    {
//        [JsonPropertyName("Financieringskosten koop")]
//        public string FinancieringskostenKoop { get; set; } = string.Empty;

//        [JsonPropertyName("Financieringskosten huur")]
//        public string FinancieringskostenHuur { get; set; } = string.Empty;

//        [JsonPropertyName("Peildatumverschuiving")]
//        public string Peildatumverschuiving { get; set; } = string.Empty;
//    }

//    public class ProjectOntwikkeling
//    {
//        [JsonPropertyName("Algemene Kosten")]
//        public string AlgemeneKosten { get; set; } = string.Empty;

//        [JsonPropertyName("Winst en risico")]
//        public string WinstEnRisico { get; set; } = string.Empty;
//    }

//    public class LocatieFactoren
//    {
//        [JsonPropertyName("Regiokosten")]
//        public string Regiokosten { get; set; } = string.Empty;

//        [JsonPropertyName("Gebiedskosten")]
//        public string Gebiedskosten { get; set; } = string.Empty;
//    }
//}
