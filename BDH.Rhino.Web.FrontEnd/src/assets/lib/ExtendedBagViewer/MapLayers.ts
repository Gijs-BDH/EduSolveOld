import { MapLayer } from "./mapLayer";



export class MapLayers {
  [key: string]: MapLayer;

  //https://www.openbasiskaart.nl/mapcache/wmts/?SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.0.0
  OSM: MapLayer = {
    type: "wms",
    name: "Openbasiskaart",
    options: {
      url: 'https://www.openbasiskaart.nl/mapcache/wms/?',
      layer: 'osm',
      style: 'default',
    }
  };

  kadaster: MapLayer = {
    type: "wms",
    name: "Kadaster", 
    options: {
      url: 'https://service.pdok.nl/kadaster/kadastralekaart/wms/v5_0?',
      layer: 'perceel',
      style: 'standaard'
    }
  };

  //https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?layer=standaard&style=default&tileMatrixSet=EPSG:28992&service=WMTS&request=GetTile&version=1.0.0&format=image/png&TileCol=6945&TileRow=8387&tileMatrix=14
  default: MapLayer = {
    type: "wmts",
    name: "PDOK BRT (standaard)",
    options: {
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
      layer: 'standaard',
      style: 'default',
      tileMatrixSet: "EPSG:28992",
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      format: "image/png"
    }
  };

  default0: MapLayer = {
    type: "wmts",
    name: "PDOK BRT (grijs)",
    options: {
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
      layer: 'grijs',
      style: 'default',
      tileMatrixSet: "EPSG:28992",
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      format: "image/png"
    }
  };

  default1: MapLayer = {
    type: "wmts",
    name: "PDOK BRT (pastel)",
    options: {
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
      layer: 'pastel',
      style: 'default',
      tileMatrixSet: "EPSG:28992",
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      format: "image/png"
    }
  };

  default2: MapLayer = {
    type: "wmts",
    name: "PDOK BRT (water)",
    options: {
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
      layer: 'water',
      style: 'default',
      tileMatrixSet: "EPSG:28992",
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      format: "image/png"
    }
  };


  luchtFoto: MapLayer = {
    type: "wmts",
    name: "PDOK Luchtfoto (RGB)",
    options: {
      url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0?',
      layer: 'Actueel_orthoHR',
      style: 'default',
      tileMatrixSet: "EPSG:28992",
      service: "WMTS",
      request: "GetTile",
      version: "1.0.0",
      format: "image/png"
    }
  };



  natura2000: MapLayer = {
    type: "wms",
    name: "PDOK Natura 2000",
    options: {
      url: 'https://service.pdok.nl/rvo/natura2000/wms/v1_0?',
      layer: 'natura2000',
      style: ''
    }
  };

  ahn: MapLayer = {
    type: "wms",
    name: "PDOK Actueel Hoogtebestand Nederland",
    options: {
      url: 'https://service.pdok.nl/rws/ahn/wms/v1_0?',
      layer: 'dtm_05m',
      style: ''
    }
  };

  waterschappenKeringenIMWA: MapLayer = {
    type: "wms",
    name: "PDOK Waterschap. Keringen IMWA",
    options: {
      url: 'https://service.pdok.nl/hwh/keringenimwa/wms/v2_0?',
      layer: 'kenmerkendeprofiellijn,toplaag,basismateriaal,referentiepunt,uitvullaag,filtervlijlaag,flexibelewaterkering,wandconstructie,geotextiel,waterkeringsectie,waterkering,bodemlaag,kistdam',
      style: ''
    }
  };

  waterschappenWaterstaatskundigeZoneringenWaterstaatswerkIMWA: MapLayer = {
    type: "wms",
    name: "PDOK Waterschap. Zoneringen IMWA",
    options: {
      url: 'https://service.pdok.nl/hwh/zoneringenimwa/wms/v1_0?',
      layer: 'waterstaatswerkoppervlaktewaterlichaam,waterbergingsgebied,beschermingszone,profielvoorvrijeruimte,waterstaatswerkwaterkering',
      style: ''
    }
  };

  rijksmonumenten: MapLayer = {
    type: "wms",
    name: "PDOK Rijksmonumenten",
    options: {
      url: 'https://service.pdok.nl/rce/ps-ch/wms/v1_0?',
      layer: 'PS.ProtectedSite',
      style: ''
    }
  };

  brtTop10NL: MapLayer = {
    type: "wms",
    name: "PDOK BRT TOP10NL",
    options: {
      url: 'https://service.pdok.nl/brt/top10nl/wms/v1_0?',
      layer: 'top10nl,functioneelgebied,functioneelgebiedlabel,gebouw,geografischgebied,geografischgebiedlabelnl,geografischgebiedlabelfr,hoogte,inrichtingselement,plaats,plaatslabel,plaatslabelfr,plaatslabelnl,plantopografie,registratiefgebied,relief,spoorbaandeel,terrein,waterdeel,wegdeel,wegdeelhartlijnlabel,wegdeelhartlijn,wegdeelhartpunt',
      style: ''
    }
  };

  broBodemkaartSGM: MapLayer = {
    type: "wms",
    name: "PDOK BRO Bodemkaart (SGM)",
    options: {
      url: 'https://service.pdok.nl/bzk/bro-bodemkaart/wms/v1_0?',
      layer: 'soilarea,areaofpedologicalinterest',
      style: ''
    }
  };

  broBodemkundigBooronderzoek: MapLayer = {
    type: "wms",
    name: "PDOK BRO Bodemkundig Booronderzoek",
    options: {
      url: 'https://service.pdok.nl/bzk/brobhrpkenset/wms/v1_0?',
      layer: 'bhr_kenset',
      style: ''
    }
  };

  publiekrechtelijkeBeperkingen: MapLayer = {
    type: "wms",
    name: "PDOK Publiekrechtelijke beperkingen",
    options: {
      url: 'https://service.pdok.nl/kadaster/wkpb/wms/v1_0?',
      layer: 'pb,pb_bl,pb_bla,pb_bg,pb_bpa,pb_bpb,pb_ew,pb_ewa,pb_ewb,pb_ewc,pb_ewd,pb_ewe,pb_bf,pb_gg,pb_gwa,pb_gs,pb_gwb,pb_gb,pb_gwc,pb_gwd,pb_gu,pb_pg,pb_hs,pb_hva,pb_lw,pb_mw,pb_go,pb_oga,pb_os,pb_opa,pb_mp,pb_pva,pb_ws,pb_wt,pb_wta,pb_wtb,pb_wtc,pb_wga,pb_wgb,pb_oh,pb_woa,pb_wob,pb_ov,pb_kw,pb_wba,pb_wbb,pb_wbc,pb_wbd,pb_wbe,pb_wbf,pb_wbg,pb_wbh,pb_wbi,pb_gl,pb_wla,pb_wn,pb_wna,pb_wx,pb_wnb,pb_wy,pb_wnc,pb_bk,pb_nm,pb_ep,pb_wra,pb_vi,pb_wva,pb_vv,pb_wvb,pb_wa,pb_wv,pb_wwa,pb_we,pb_wwb,pb_wg,pb_wwc,pb_wi,pb_wwd,pb_wu,pb_wwe,pb_wwf,pb_ww',
      style: ''
    }
  };

  bestemming: MapLayer = {
    type: "wms",
    name: "Bestemmingsplan",
    options: {
      url: 'https://service.pdok.nl/kadaster/plu/wms/v1_0?',
      layer: 'gebiedsaanduiding',
      style: 'gebiedsaanduiding'
    }
  };
}
