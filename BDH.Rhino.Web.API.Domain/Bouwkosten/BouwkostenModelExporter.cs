
using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class BouwkostenModelExporter
    {
        private readonly BouwkostenSummary bouwkostenOverzicht;
        private readonly IWritePDF pdfWriter;

        public BouwkostenModelExporter(BouwkostenSummary bouwkostenOverzicht, IWritePDF pdfWriter)
        {
            this.bouwkostenOverzicht = bouwkostenOverzicht;
            this.pdfWriter = pdfWriter;
        }

        public void Build()
        {
            pdfWriter.DefineBackgroundImage();

            pdfWriter.DefineCover("Test Project Naam Rapport", "Afdeling Design Automation");

            pdfWriter.AddText("Gebouwd per typologie", "Heading1");

            foreach (var typologie in bouwkostenOverzicht.Typologies)
            {
                pdfWriter.AddText("");

                pdfWriter.AddText(typologie.Name, "Heading2");

                var table = pdfWriter.AddTable(2);

                pdfWriter.AddRow(table, "BVO", decimal.Round(typologie.BVO).ToString());
                pdfWriter.AddRow(table, "Bouwkosten per m2 BVO", decimal.Round(typologie.BasisKostenPerM2BVO).ToString());
                pdfWriter.AddRow(table, "Bouwkosten Totaal", decimal.Round(typologie.KostenTotaal).ToString());
                pdfWriter.AddRow(table, "Meerprijs EPC per m2 BVO", decimal.Round(typologie.MeerprijsEpcPerM2BVO).ToString());
                pdfWriter.AddRow(table, "Meerprijs EPC", decimal.Round(typologie.KostenEpc).ToString());
                pdfWriter.AddRow(table, "Meerprijs BENG per m2 BVO", decimal.Round(typologie.MeerprijsBengPerM2BVO).ToString());
                pdfWriter.AddRow(table, "Meerprijs BENG", decimal.Round(typologie.KostenBeng).ToString());
            }

            pdfWriter.AddText("");

            pdfWriter.AddText("Totale Bouwkosten", "Heading2");

            var table1 = pdfWriter.AddTable(2);

            pdfWriter.AddRow(table1, "Bouwkosten", decimal.Round(bouwkostenOverzicht.Bouwkosten).ToString());
            pdfWriter.AddRow(table1, "Kosten BENG", decimal.Round(bouwkostenOverzicht.KostenBeng).ToString());
            pdfWriter.AddRow(table1, "Kosten EPC", decimal.Round(bouwkostenOverzicht.KostenEpc).ToString());

            pdfWriter.AddText("");

            pdfWriter.AddText("Honoratia", "Heading2");

            var table2 = pdfWriter.AddTable(3);

            pdfWriter.AddRow(table2, "Architect", decimal.Round(bouwkostenOverzicht.Honoratia.Architect).ToString(), bouwkostenOverzicht.KostenVerdeling.Architect.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Stedenbouwkundige", decimal.Round(bouwkostenOverzicht.Honoratia.Stedenbouwkundige).ToString(), bouwkostenOverzicht.KostenVerdeling.Stedenbouwkundige.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Interieur", decimal.Round(bouwkostenOverzicht.Honoratia.Interieur).ToString(), bouwkostenOverzicht.KostenVerdeling.Interieur.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Constructeur", decimal.Round(bouwkostenOverzicht.Honoratia.Constructeur).ToString(), bouwkostenOverzicht.KostenVerdeling.Constructeur.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Adviseur installaties", decimal.Round(bouwkostenOverzicht.Honoratia.AdviseurInstallaties).ToString(), bouwkostenOverzicht.KostenVerdeling.AdviseurInstallaties.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Bouwfysica / duurzaamheid", decimal.Round(bouwkostenOverzicht.Honoratia.Bouwfysica).ToString(), bouwkostenOverzicht.KostenVerdeling.Bouwfysica.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Projectmanagement", decimal.Round(bouwkostenOverzicht.Honoratia.ProjectManagement).ToString(), bouwkostenOverzicht.KostenVerdeling.ProjectManagement.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Kostenmanagement", decimal.Round(bouwkostenOverzicht.Honoratia.KostenManagement).ToString(), bouwkostenOverzicht.KostenVerdeling.KostenManagement.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Toezicht tijdens de bouw", decimal.Round(bouwkostenOverzicht.Honoratia.Toezicht).ToString(), bouwkostenOverzicht.KostenVerdeling.Toezicht.ToString() + " (%)");
            pdfWriter.AddRow(table2, "Overige adviseurs", decimal.Round(bouwkostenOverzicht.Honoratia.OverigeAdviseurs).ToString(), bouwkostenOverzicht.KostenVerdeling.OverigeAdviseurs.ToString() + " (%)");

            pdfWriter.AddText("");

            pdfWriter.AddText("Heffingen Aansluitkosten en Verzekeringen", "Heading2");

            var table3 = pdfWriter.AddTable(3);

            pdfWriter.AddRow(table3, "Leges en aansluitkosten", decimal.Round(bouwkostenOverzicht.Heffingen.Leges).ToString(), decimal.Round(bouwkostenOverzicht.KostenVerdeling.Leges).ToString() + " (%)");
            pdfWriter.AddRow(table3, "Verzekeringen opdrachtgever", decimal.Round(bouwkostenOverzicht.Heffingen.Verzekeringen).ToString(), decimal.Round(bouwkostenOverzicht.KostenVerdeling.Verzekeringen).ToString() + " (%)");

            pdfWriter.AddText("");

            pdfWriter.AddText("Heffingen Aansluitkosten en Verzekeringen", "Heading2");

            var table4 = pdfWriter.AddTable(3);

            pdfWriter.AddRow(table4, "Brochures, Advertenties en Reclamekosten", decimal.Round(bouwkostenOverzicht.AanloopEnAfzet.Brochures).ToString(), bouwkostenOverzicht.KostenVerdeling.Brochures.ToString() + " (%)");
            pdfWriter.AddRow(table4, "Bemiddelings- en makelaarskosten", decimal.Round(bouwkostenOverzicht.AanloopEnAfzet.Bemiddling).ToString(), bouwkostenOverzicht.KostenVerdeling.Bemiddling.ToString() + " (%)");
            pdfWriter.AddRow(table4, "Notaris kosten", decimal.Round(bouwkostenOverzicht.AanloopEnAfzet.Notaris).ToString(), bouwkostenOverzicht.KostenVerdeling.Notaris.ToString() + " (%)");

            pdfWriter.AddText("");

            pdfWriter.AddText("Heffingen Aansluitkosten en Verzekeringen", "Heading2");

            var table5 = pdfWriter.AddTable(3);

            pdfWriter.AddRow(table5, "Financieringskosten koop", decimal.Round(bouwkostenOverzicht.Financiering.FinancieringKoop).ToString(), bouwkostenOverzicht.KostenVerdeling.FinancieringKoop.ToString() + " (%)");
            pdfWriter.AddRow(table5, "Financieringskosten huur", decimal.Round(bouwkostenOverzicht.Financiering.FinancieringHuur).ToString(), bouwkostenOverzicht.KostenVerdeling.FinancieringHuur.ToString() + " (%)");
            pdfWriter.AddRow(table5, "Peildatumverschuiving", decimal.Round(bouwkostenOverzicht.Financiering.PeildatumVerschuiving).ToString(), bouwkostenOverzicht.KostenVerdeling.PeildatumVerschuiving.ToString() + " (%)");

            pdfWriter.AddText("");

            pdfWriter.AddText("ProjectOntwikkeling", "Heading2");

            var table6 = pdfWriter.AddTable(3);

            pdfWriter.AddRow(table6, "Algemene Kosten", decimal.Round(bouwkostenOverzicht.ProjectOntwikkeling.AlgemeneKosten).ToString(), bouwkostenOverzicht.KostenVerdeling.AlgemeneKosten.ToString() + " (%)");
            pdfWriter.AddRow(table6, "Winst en risico", decimal.Round(bouwkostenOverzicht.ProjectOntwikkeling.WinstEnRisico).ToString(), bouwkostenOverzicht.KostenVerdeling.WinstEnRisico.ToString() + " (%)");
        }

        public void Render()
        {
            pdfWriter.RenderDocument();
        }

        public byte[] FileContents() => pdfWriter.Contents();
    }
}
