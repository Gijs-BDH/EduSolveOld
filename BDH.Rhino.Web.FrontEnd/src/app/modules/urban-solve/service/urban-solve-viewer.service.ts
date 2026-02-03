import { Injectable } from "@angular/core";
import { BagViewerService } from "@app/modules/project-editor/service/bag-viewer.service";
import { PolygonFactory } from "@app/modules/project-editor/service/polygon-factory.service";
import { PolylineFactoryService } from "@app/modules/project-editor/service/polyline-factory.service";
import { PolygonToolsService } from "@app/shared/service/polygon-tools.service";
import { GenericMass } from "../models/GenericMass";
import { TileProxy } from "../models/Three/TileProxy";
import { Tile } from "../models/Tile";
import { Way } from "../models/Way";
import { WayProxy } from "../models/Three/WayProxy";
import { GenericMassModelFactoryService } from "./generic-mass-model-factory.service";
import { UrbanSolveDataService } from "./urban-solve-data.service";
import { CatalogDataModel } from "../models/CatalogDataModel";
import { CatalogFactoryService } from "./catalog-factory.service";
import { SchoolDataModel } from "../models/SchoolDataModel";
import { SchoolModelFactoryService } from "./school-model-factory.service";
import { GeoJsonConvert } from "../../../shared/service/static/GeoJsonConvert";


@Injectable({
    providedIn: 'root'
})
export class UrbanSolveViewerService {
    public get renderBag() {
        return this.bagViewer.renderBag;
    }
    public set renderBag(val){
        this.bagViewer.renderBag = val;
    }

    constructor(
        private data: UrbanSolveDataService,
        public bagViewer: BagViewerService,
        private polygonTools: PolygonToolsService,
        private polylineFactory : PolylineFactoryService,
        private massModelFactory : GenericMassModelFactoryService,
        private polygonFactory: PolygonFactory,
        private catalogusFactory : CatalogFactoryService,
        private schoolFactory : SchoolModelFactoryService) {

        }


   

    rebuildSceneGeometries(preventTileSplit : boolean = false){
        //clear existing data
        this.bagViewer.removeUserElements();

        if(!preventTileSplit){
            this.data.resetClip();
        }

        //first set base polygon
        this.addTileCollection(this.data.tileCollection?.getTiles() ?? []);

        //re-add ways
        this.addWays(this.data.getWays());
        
        //re-add tiles
        this.addTileCollection(this.data.getTiles());

        //re-add generic masses
        this.addGenericMasses(this.data.getGenericMasses());

        this.data.getCatalogs().forEach(c => this.addCatalogToScene(c));
        this.data.getSchoolModels().forEach(s => this.addSchoolToScene(s));

        this.ensureRerender();
    }


    addWays(ways: Way[]): void {
        ways.forEach(way => {
            var proxy = new WayProxy(way, this, this.data);
            var mesh: any = this.polylineFactory.create(way.points, 0x00ff00, 1);
            proxy.add(mesh);

            this.bagViewer.addUserElement(proxy);
        });
    }

    addTileCollection(tileCollection: Tile[]): void {
        tileCollection.forEach(tile => {
            var proxy = new TileProxy(tile);
            var mesh = this.polygonFactory.create(tile.points,0x748D69, 0x748D69);
            proxy.add(mesh);

            this.bagViewer.addUserElement(proxy);
        });
    }

    addGenericMasses(masses: GenericMass[]): void {
      masses.forEach(mass => {
          var color = mass.typology.geometrieKleur
            if(!this.polygonTools.pointInPolygon(mass.position, GeoJsonConvert.fromGeoJson(this.data.projectInformation!.basePolygon))){
                color = 'red';
            }

            var proxy = this.massModelFactory.create(color, mass, this, this.data);
            this.bagViewer.addUserElement(proxy);
        });
    }

    addCatalogToScene(catalog : CatalogDataModel) : void{
        var proxy = this.catalogusFactory.createLine(catalog, this.data, this);
        this.bagViewer.addUserElement(proxy);
    }

    addSchoolToScene(school : SchoolDataModel): void{
        var proxy = this.schoolFactory.create(school, this.data, this);
        this.bagViewer.addUserElement(proxy);
    }

    ensureRerender(): void {
        this.bagViewer.ensureRerender();
    }

    hideSelectedBag(): void {
        this.bagViewer.bagViewer.hideSelected();
    }
    
    revealSelectedBag(): void {
        this.bagViewer.bagViewer.unHideSelected();
    }

    revealTemporary() : void{
        this.bagViewer.bagViewer.revealHiddenTemporary();
    }

    resetTemporaryReveal(): void {
        this.bagViewer.bagViewer.resetTemporaryReveal();
    }

    addToBuildingHighlightGroup(object: any, batchId: string): void {
        this.bagViewer.bagViewer.addToSelection(object, batchId);
    }
    
    setBuildingHighlighted(object: any, batchId: string): void {
        this.bagViewer.bagViewer.setSingleSelected(object, batchId);
    }

    clearBuildingHighlighted() : void{
        this.bagViewer.bagViewer.clearSelection();
    }
}
