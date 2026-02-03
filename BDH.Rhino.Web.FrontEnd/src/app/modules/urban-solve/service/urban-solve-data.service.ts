import { Injectable } from '@angular/core';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';
import { PolygonClipperService } from '@app/shared/service/polygon-clipper.service';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { DataModel } from '../../project-editor/models/DataModel';
import { GenericMass } from '../models/GenericMass';
import { Tile } from '../models/Tile';
import { TileCollection } from '../models/TileCollection';
import { TilePoperties } from '../models/TileProperties';
import { Way } from '../models/Way';
import { IsBouwkostenBasisTypologie } from '@app/data/schema/models/bouwkosten-basis-typologie';
import { CatalogDataModel } from '../models/CatalogDataModel';
import { SchoolDataModel } from '../models/SchoolDataModel';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { Project } from '../models/Project';
import { ProjectVersion } from '../models/ProjectVersion';
import { GeoJsonConvert } from '../../../shared/service/static/GeoJsonConvert';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
  providedIn: 'root'
})
export class UrbanSolveDataService {

    private ways : Way[] = [];
    private genericMasses : GenericMass[] = [];
    private catalogs : CatalogDataModel[] = [];
    private schoolModels : SchoolDataModel[] = [];

    public tileCollection : TileCollection | null = null;
    public projectInformation: Project | null = null;
  public projectVersionInformation: ProjectVersion | null = null;

    constructor(private polygonClipper : PolygonClipperService, private polygonTools : PolygonToolsService, private dataModelConceptPropertiesDictionary : BuildingConceptPropertiesDictionaryService){

    }

    setProject(projectInformation : Project | null){
        this.clear();
      this.projectInformation = projectInformation;
      this.projectVersionInformation = null;
  }

  setProjectVersion(projectVersionInformation: ProjectVersion | null) {
    this.projectVersionInformation = projectVersionInformation;
  }

    projectArea() : number{
        if(!this.projectInformation){
            return 0;
        }

        return this.polygonTools.area(GeoJsonConvert.fromGeoJson(this.projectInformation.basePolygon) );
    }

    addWay(points: IsPoint2d[], diameter : number){
        var way = new Way(points, diameter);
        this.ways.push(way);
        return way;
    }

    addGenericMassDefault(position : IsPoint2d, rotation : number, conceptId : IsBouwkostenBasisTypologie){
        var mass = new GenericMass(position, conceptId, undefined, undefined, undefined, rotation);
        this.genericMasses.push(mass);
        return mass;
    }

    addGenericMass(position : IsPoint2d, rotation : number, conceptId : IsBouwkostenBasisTypologie, width: number, height: number, depth: number){
        var mass = new GenericMass(position, conceptId, width, height, depth, rotation);
        this.genericMasses.push(mass);
        return mass;
    }

    addCatalog(id : BuildingConceptCatalog, startPoint : IsPoint2d, endPoint : IsPoint2d){
        var model = new CatalogDataModel(startPoint, endPoint, id);
        this.catalogs.push(model);
        return model;
    }

    addSchool(model : SchoolDataModel){
        this.schoolModels.push(model);
        return model;
    }

    getTiles() : Tile[]{
        if(!this.tileCollection){
            return [];
        }
        
        return this.tileCollection?.getTiles();
    }

    getWays() : Way[]{
        return this.ways;
    }

    getGenericMasses() : GenericMass[]{
        return this.genericMasses;
    }

    getCatalogs() : CatalogDataModel[]{
        return this.catalogs;
    }

    getSchoolModels() : SchoolDataModel[]{
        return this.schoolModels;
    }

    resetClip(){
        if(this.projectInformation == null){
            this.tileCollection = null;
            return;
        }

        var concept = this.dataModelConceptPropertiesDictionary.items[0]?.name ?? '';
        var baseTile = new Tile(new TilePoperties(concept), GeoJsonConvert.fromGeoJson(this.projectInformation.basePolygon), this.polygonTools);
        if(this.tileCollection == null){
            this.tileCollection = new TileCollection(baseTile);
        }

        var inputPoints = [baseTile.points.map(i => i)];
        this.polygonClipper.clip(inputPoints, this.ways.map(i => i));

        var newTiles : Tile[] = [];
        inputPoints.forEach(points => {
            var tile = new Tile(new TilePoperties(concept), points, this.polygonTools);
            newTiles.push(tile);
        })

        var newTileCollection = new TileCollection(newTiles).projectProperties(this.tileCollection);
        this.tileCollection = newTileCollection;
    }
    
    clear(){
        this.ways.length = 0;
        this.genericMasses.length = 0;
        this.catalogs.length = 0;
        this.schoolModels.length = 0;
    }

    removeGeneric(generic : DataModel){
        if(generic instanceof GenericMass){
            var index = this.genericMasses.indexOf(generic);
            if(index != -1){
                this.genericMasses.splice(index, 1);
            }
            return;
        }

        if(generic instanceof Way){
            var index = this.ways.indexOf(generic);
            if(index != -1){
                this.ways.splice(index, 1);
            }
            return;
        }

        if(generic instanceof CatalogDataModel){
            var index = this.catalogs.indexOf(generic);
            if(index != -1){
                this.catalogs.splice(index, 1);
            }
            return;
        }

        if(generic instanceof SchoolDataModel){
            var index = this.schoolModels.indexOf(generic);
            if(index != -1){
                this.schoolModels.splice(index, 1);
            }
            return;
        }

        throw new Error("Type of generic is not recognized as part of the scene.");
    }
}
