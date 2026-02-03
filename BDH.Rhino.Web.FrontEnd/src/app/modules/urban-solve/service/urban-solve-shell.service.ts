import { Injectable } from '@angular/core';
import { BaseShell } from '@app/modules/project-editor/models/BaseShell';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { DataModelPainterCollectionService } from '@app/modules/project-editor/service/data-model-painter-collection.service';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { DataModel } from '../../project-editor/models/DataModel';
import { GenericMass } from '../models/GenericMass';
import { TileProxy } from '../models/Three/TileProxy';
import { Tile } from '../models/Tile';
import { Way } from '../models/Way';
import { UrbanSolveViewerService } from './urban-solve-viewer.service';
import { UrbanSolveDataService } from './urban-solve-data.service';
import { GenericMassModelProxy } from '../models/Three/GenericMassModelProxy';
import { WayProxy } from '../models/Three/WayProxy';
import { ProjectBoundaryPainterService } from './project-boundary-painter.service';
import { GenericMassPainterService } from './generic-mass-painter.service';
import { WayPainterService } from './way-painter.service';
import { IsBouwkostenBasisTypologie } from '@app/data/schema/models/bouwkosten-basis-typologie';
import { CatalogPainterService } from './catalog-painter.service';
import { GeoJsonConvert } from '../../../shared/service/static/GeoJsonConvert';
import { CatalogModelProxy } from '../models/Three/CatalogModelProxy';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class UrbanSolveShellService extends BaseShell {
   
   
    override removeAllUserElements(): void {
        this.bagViewr.removeUserElements();
    }

    enumerateUserElements(): DataModel[] {
        var arr : DataModel[] = [];
        var genericMasses = this.data.getGenericMasses();
        var tiles = this.data.getTiles();
        var ways = this.data.getWays();

        for(var i = 0; i<genericMasses.length; i++){
            let ele = genericMasses[i];
            arr.push(ele);
        }

        for(var i = 0; i<tiles.length; i++){
            let ele = tiles[i];
            arr.push(ele);
        }

        for(var i = 0; i<ways.length; i++){
            let ele = ways[i];
            arr.push(ele);
        }

        return arr;
    }

    drawProjectToCanvas(preventTileSplit : boolean = false): void {
        this.viewer.rebuildSceneGeometries(preventTileSplit);
    }

    
    public get selectedTile() : Tile | null{
        var tile : Tile | null = null;
        this.bagViewr.enumerateUserElements().forEach(m => {
            if(tile){
                return;
            }

            if(m instanceof TileProxy && m.isSelected){
                tile = m.tile;
            }
        })
        return tile;
    }

    public get selectedMass() : GenericMass | null{
        var tile : GenericMass | null = null;
        tile = this.getGenericMasses().find(m => {
            return m.isSelected
        }) ?? null;
        return tile;
    }

    public get selectedWay() : Way | null{
        var tile : Way | null = null;
        this.bagViewr.enumerateUserElements().forEach(m => {
            if(tile){
                return;
            }

            if(m instanceof WayProxy && m.isSelected){
                tile = m.way;
            }
        })
        return tile;
    }
    
    reavealHidden: boolean = false;

    public get projectIsActive() {
        return this.data.projectInformation != null;
    }
   
    constructor(
        //services should be private but too lazy to refactor
        public viewer: UrbanSolveViewerService,
        private data : UrbanSolveDataService,
        private painterCollection : DataModelPainterCollectionService,
        private bagViewr : BagViewerService,
        private polylineTools : PolygonToolsService,
        private catalogPainter : CatalogPainterService,
        public boundaryPainter: ProjectBoundaryPainterService,
        public wayPainter : WayPainterService,
        public genericMassPainter : GenericMassPainterService){
            
            super();

            painterCollection.register(boundaryPainter);
            painterCollection.register(wayPainter);
            painterCollection.register(genericMassPainter);
            painterCollection.register(catalogPainter);
        }

    getBuildingConceptProxies() : CatalogModelProxy[]{
        var proxies : CatalogModelProxy[] = [];
        this.bagViewr.enumerateUserElements().forEach(m => {

            if(m instanceof CatalogModelProxy){
                proxies.push(m)
            }
        })
        return proxies;
    }

    getMassModelProxies() : GenericMassModelProxy[]{
        var proxies : GenericMassModelProxy[] = [];
        this.bagViewr.enumerateUserElements().forEach(m => {

            if(m instanceof GenericMassModelProxy){
                proxies.push(m)
            }
        })
        return proxies;
    }

    startDrawingPolygon(){
        this.painterCollection.setActive(this.boundaryPainter);
        return this.boundaryPainter;
    }

    startDrawingGenericMass(conceptId : IsBouwkostenBasisTypologie) : void{
       
        this.painterCollection.setActive(this.genericMassPainter);

        this.genericMassPainter.configureOnCommit(points => {
            points.forEach(point => {
                this.data.addGenericMassDefault(point, 0, conceptId);
            })

            this.viewer.rebuildSceneGeometries();
        });
    }

    startDrawingCatalog(){
        this.painterCollection.setActive(this.catalogPainter);
        return this.catalogPainter;
    }

    startDrawingTileSplitter(){
        this.painterCollection.setActive(this.wayPainter);
        return this.wayPainter;
    }
    
    removeInPolygon(polygon : IsPoint2d[]){
        var toRemove : DataModel[] = this.data
            .getGenericMasses()
            .filter(c => this.polylineTools.pointInPolygon(c.position, polygon));

        toRemove.forEach(e => {
            this.data.removeGeneric(e);
        })

        toRemove = this.data
            .getCatalogs()
            .filter(c => !c.pinned && (this.polylineTools.pointInPolygon(c.startPoint, polygon) || this.polylineTools.pointInPolygon(c.endPoint, polygon) ));

        toRemove.forEach(e => {
            this.data.removeGeneric(e);
        })
    }

    getGenericMasses() {
        return this.data.getGenericMasses();
    }

    zoomAll(){
        if(!this.data.projectInformation){
            return;
        }

        var nx = 0;
        var ny = 0;
        var avgx = 0;
        var avgy = 0;

        for(const m of GeoJsonConvert.fromGeoJson(this.data.projectInformation.basePolygon)){
            avgx += m.x;
            avgy += m.y
            nx ++;
            ny ++;
        }

        avgx /= nx;
        avgy /= ny;
        this.bagViewr.bagViewer.positionCamera(avgx, 0, avgy);
        this.bagViewr.bagViewer.pointCameraToNorth();
    }

    findMassProxy(mass : GenericMass) : GenericMassModelProxy | null{
        var tile : GenericMassModelProxy | null = null;
        this.bagViewr.enumerateUserElements().forEach(m => {
            if(tile){
                return;
            }

            if(m instanceof GenericMassModelProxy && m.dataModel === mass){
                tile = m;
            }
        })
        return tile;
    }
}
