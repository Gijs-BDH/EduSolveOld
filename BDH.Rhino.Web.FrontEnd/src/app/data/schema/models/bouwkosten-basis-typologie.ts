export interface IsBouwkostenBasisTypologie {
  name: string;
  bouwkostenPerBvoBasis: number;
  brutoInhoudPerBvoBasis: number;
  prijsinvloedBeng: number;
  prijsInvloedEpc: number;
  gemiddeldBvoPerWoning: number | undefined;
  geometrieKleur: string | undefined;
  maximaleHoogte: number;
}

const defaultColor = "#7D6D5D";
const parkingColor = "#0000FF";
export const bouwkostenBasisTypologieCollectie: IsBouwkostenBasisTypologie[] = [
  {
    name: "Cataloguswoning (2 laags)",
    bouwkostenPerBvoBasis: 1037,
    brutoInhoudPerBvoBasis: 2.31,
    prijsinvloedBeng: 108,
    prijsInvloedEpc: 147,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Cataloguswoning (3 laags)",
    bouwkostenPerBvoBasis: 1058,
    brutoInhoudPerBvoBasis: 2.78,
    prijsinvloedBeng: 80,
    prijsInvloedEpc: 127,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Herenhuis (schuin dak)",
    bouwkostenPerBvoBasis: 1243,
    brutoInhoudPerBvoBasis: 2.67,
    prijsinvloedBeng: 71,
    prijsInvloedEpc: 117,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Herenhuis (plat dak)",
    bouwkostenPerBvoBasis: 1485,
    brutoInhoudPerBvoBasis: 3.16,
    prijsinvloedBeng: 76,
    prijsInvloedEpc: 163,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Stedelijke villa (schuin dak)",
    bouwkostenPerBvoBasis: 1325,
    brutoInhoudPerBvoBasis: 2.69,
    prijsinvloedBeng: 89,
    prijsInvloedEpc: 141,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Stedelijke villa (plat dak)",
    bouwkostenPerBvoBasis: 1582,
    brutoInhoudPerBvoBasis: 3.16,
    prijsinvloedBeng: 81,
    prijsInvloedEpc: 165,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Landelijke villa (schuin dak/klein)",
    bouwkostenPerBvoBasis: 1430,
    brutoInhoudPerBvoBasis: 2.47,
    prijsinvloedBeng: 101,
    prijsInvloedEpc: 130,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Landelijke villa (schuin dak/groot)",
    bouwkostenPerBvoBasis: 1207,
    brutoInhoudPerBvoBasis: 2.81,
    prijsinvloedBeng: 75,
    prijsInvloedEpc: 88,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Bungalow (tot 120m2)",
    bouwkostenPerBvoBasis: 1629,
    brutoInhoudPerBvoBasis: 3.22,
    prijsinvloedBeng: 137,
    prijsInvloedEpc: 247,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Bungalow (vanaf 120m2)",
    bouwkostenPerBvoBasis: 1487,
    brutoInhoudPerBvoBasis: 3.22,
    prijsinvloedBeng: 130,
    prijsInvloedEpc: 182,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Recreatiewoning (schuin dak)",
    bouwkostenPerBvoBasis: 1184,
    brutoInhoudPerBvoBasis: 2.30,
    prijsinvloedBeng: 108,
    prijsInvloedEpc: 168,
    gemiddeldBvoPerWoning: 110,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Recreatiewoning (plat dak)",
    bouwkostenPerBvoBasis: 1406,
    brutoInhoudPerBvoBasis: 2.90,
    prijsinvloedBeng: 137,
    prijsInvloedEpc: 230,
    gemiddeldBvoPerWoning: 60,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Passief huis",
    bouwkostenPerBvoBasis: 1571,
    brutoInhoudPerBvoBasis: 2.69,
    prijsinvloedBeng: 0,
    prijsInvloedEpc: 0,
    gemiddeldBvoPerWoning: 234,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Woonboerderij",
    bouwkostenPerBvoBasis: 962,
    brutoInhoudPerBvoBasis: 2.78,
    prijsinvloedBeng: 85,
    prijsInvloedEpc: 90,
    gemiddeldBvoPerWoning: 230,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Twee onder één kap (schuin dak)",
    bouwkostenPerBvoBasis: 1129,
    brutoInhoudPerBvoBasis: 2.60,
    prijsinvloedBeng: 73,
    prijsInvloedEpc: 98,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Twee onder één kap (schuin dak met garage geschakeld)",
    bouwkostenPerBvoBasis: 1116,
    brutoInhoudPerBvoBasis: 2.31,
    prijsinvloedBeng: 71,
    prijsInvloedEpc: 96,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Twee onder één kap (plat dak)",
    bouwkostenPerBvoBasis: 1242,
    brutoInhoudPerBvoBasis: 2.86,
    prijsinvloedBeng: 80,
    prijsInvloedEpc: 138,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Twee onder één kap (plat dak met garage geschakeld)",
    bouwkostenPerBvoBasis: 1214,
    brutoInhoudPerBvoBasis: 3.14,
    prijsinvloedBeng: 88,
    prijsInvloedEpc: 142,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Herenhuis (geschakeld met garage)",
    bouwkostenPerBvoBasis: 1136,
    brutoInhoudPerBvoBasis: 2.31,
    prijsinvloedBeng: 72,
    prijsInvloedEpc: 105,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Herenhuis (standaard)",
    bouwkostenPerBvoBasis: 1277,
    brutoInhoudPerBvoBasis: 3.34,
    prijsinvloedBeng: 65,
    prijsInvloedEpc: 142,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Seriematig 2 laags (schuin dak)",
    bouwkostenPerBvoBasis: 991,
    brutoInhoudPerBvoBasis: 2.50,
    prijsinvloedBeng: 81,
    prijsInvloedEpc: 126,
    gemiddeldBvoPerWoning: 100,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Seriematig 2 laags (plat dak)",
    bouwkostenPerBvoBasis: 1168,
    brutoInhoudPerBvoBasis: 2.95,
    prijsinvloedBeng: 68,
    prijsInvloedEpc: 155,
    gemiddeldBvoPerWoning: 100,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Seriematig 3 laags (schuin dak)",
    bouwkostenPerBvoBasis: 946,
    brutoInhoudPerBvoBasis: 2.63,
    prijsinvloedBeng: 72,
    prijsInvloedEpc: 116,
    gemiddeldBvoPerWoning: 135,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Seriematig 3 laags (plat dak)",
    bouwkostenPerBvoBasis: 1036,
    brutoInhoudPerBvoBasis: 2.93,
    prijsinvloedBeng: 60,
    prijsInvloedEpc: 138,
    gemiddeldBvoPerWoning: 135,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Seriematig 4 laags (plat dak)",
    bouwkostenPerBvoBasis: 1025,
    brutoInhoudPerBvoBasis: 3.65,
    prijsinvloedBeng: 53,
    prijsInvloedEpc: 140,
    gemiddeldBvoPerWoning: 170,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Drive-in woning (2 laags)",
    bouwkostenPerBvoBasis: 1208,
    brutoInhoudPerBvoBasis: 2.95,
    prijsinvloedBeng: 82,
    prijsInvloedEpc: 159,
    gemiddeldBvoPerWoning: 110,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Drive-in woning (3 laags)",
    bouwkostenPerBvoBasis: 1075,
    brutoInhoudPerBvoBasis: 2.93,
    prijsinvloedBeng: 59,
    prijsInvloedEpc: 137,
    gemiddeldBvoPerWoning: 160,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Drive-in woning (4 laags)",
    bouwkostenPerBvoBasis: 979,
    brutoInhoudPerBvoBasis: 2.92,
    prijsinvloedBeng: 47,
    prijsInvloedEpc: 129,
    gemiddeldBvoPerWoning: 190,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Herenhuis (modern)",
    bouwkostenPerBvoBasis: 1632,
    brutoInhoudPerBvoBasis: 3.84,
    prijsinvloedBeng: 69,
    prijsInvloedEpc: 160,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Sociale huurwoningen",
    bouwkostenPerBvoBasis: 944,
    brutoInhoudPerBvoBasis: 2.51,
    prijsinvloedBeng: 79,
    prijsInvloedEpc: 142,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Patiowoning (1 laags)",
    bouwkostenPerBvoBasis: 1503,
    brutoInhoudPerBvoBasis: 3.00,
    prijsinvloedBeng: 128,
    prijsInvloedEpc: 212,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Patiowoning (2 laags)",
    bouwkostenPerBvoBasis: 1370,
    brutoInhoudPerBvoBasis: 2.97,
    prijsinvloedBeng: 116,
    prijsInvloedEpc: 195,
    gemiddeldBvoPerWoning: undefined,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Beneden-bovenwoning (2 laags)",
    bouwkostenPerBvoBasis: 1227,
    brutoInhoudPerBvoBasis: 2.95,
    prijsinvloedBeng: 170,
    prijsInvloedEpc: 0,
    gemiddeldBvoPerWoning: 60,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Beneden-bovenwoning (3 laags)",
    bouwkostenPerBvoBasis: 1001,
    brutoInhoudPerBvoBasis: 2.60,
    prijsinvloedBeng: 120,
    prijsInvloedEpc: 0,
    gemiddeldBvoPerWoning: 70,
    geometrieKleur: defaultColor,
    maximaleHoogte: 0
  },
  {
    name: "Parkeerplaats",
    bouwkostenPerBvoBasis: 500,
    brutoInhoudPerBvoBasis: 0,
    prijsinvloedBeng: 0,
    prijsInvloedEpc: 0,
    gemiddeldBvoPerWoning: 0,
    geometrieKleur: parkingColor,
    maximaleHoogte: 1
  }
]
