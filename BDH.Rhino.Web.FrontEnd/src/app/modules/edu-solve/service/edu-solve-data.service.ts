import { Injectable } from '@angular/core';
import { ObstacleDataModel } from '../models/ObstacleDataModel';
import { Project } from '../models/Project';
import { Cluster } from '../models/Cluster';
import { ProjectVersion } from '../models/DataTransferObjects/ProjectVersion';
import { FixedPointDataModel } from '../models/FixedPointDataModel';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { GridCellsProviderService } from './grid-cells-provider.service';
import { SchoolModel } from '../models/SchoolModel';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class EduSolveDataService {

    project: Project | undefined;

    obstacles : ObstacleDataModel[] = [];
    clusters : Cluster[] = []

    useSeed : Boolean = false;
    seed : number | null = null;
    allowDisconnected : boolean = true;

    public generatedSchoolClusters? : SchoolModel | undefined;

    public get projectActive() : boolean {
        if(this.project){
            return true;
        }

        return false;
    }

    public get basePolygonPoints () : IsPoint2d[]{
        if(!this.project){
            return [];
        }

        return this.project.basePolygon;
    }

    public get centerOfGravity() : IsPoint2d{
        var centerofGravity = this.polygonTools.centerOfGravity(this.basePolygonPoints);
        return centerofGravity;
    }

    constructor(private polygonTools : PolygonToolsService) { }

    setProject(information : Project | undefined){
        this.project = information;
        this.obstacles = [];
    }

    setVersion(response : ProjectVersion, gridCellProvider : GridCellsProviderService){
        this.obstacles = response.obstacles.map(o => {
            return new ObstacleDataModel(o);
        });
        this.clusters = response.clusters.map(c => {
            var cluster = Cluster.fromSchema(c);
            cluster.fixedPoints = c.fixedPoints.map(p => new FixedPointDataModel(gridCellProvider.pointXyToWorld(p)));
            return cluster;
        })

        this.allowDisconnected = response.allowDisconnected;

        if(response.seed){
            this.useSeed = true;
            this.seed = response.seed;
        }
        else{
            this.useSeed = false;
            this.seed = null;
        }
    }



}


