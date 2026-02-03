import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { environment } from '@env';
import { EduSolveShellService } from './edu-solve-shell.service';
import { EduSolveDataService } from './edu-solve-data.service';
import { ClusterCell } from "../models/DataTransferObjects/ClusterCell";
import { map } from 'rxjs';
import { Cluster } from '../models/Cluster';
import { GeneratedSchoolResponse } from '../models/DataTransferObjects/GeneratedSchoolResponse';
import { GenerateSchoolBulkResponse } from '../models/DataTransferObjects/GenerateSchoolBulkResponse';
import { GridCellsProviderService } from './grid-cells-provider.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class SolverService {

    private baseUrl : string = environment.apiUrl + "/GenerativeDesign";
    
    constructor(private http: HttpClient, private polygonTools : PolygonToolsService, private gridCellProvider : GridCellsProviderService) { 

    }

    prepareCells(){
        var cells = this.gridCellProvider.getTilesXY()
        .filter(cell => {
            var excluded = this.gridCellProvider.getObstaclesXY().find(o => this.polygonTools.pointInPolygon(o, cell));
            return !excluded;
        })
        .map(tile => {
            return this.polygonTools.average(tile);
        })

        return cells;
    }

    solve(cells : IsPoint2d[], clusters : Cluster[], seed : number | null, gridSize : number, gridSizeY : number, allowDisconnected : boolean, data : GridCellsProviderService){       
        var url = this.baseUrl + "/school";

        var body = {
            raster : cells,
            clusters : clusters.map(c => c.mapToSchema(data)),
            seed: seed,
            gridSize : gridSize,
            gridSizeY : gridSizeY,
            allowDisconnected : allowDisconnected
        }

        return this.http.post<GeneratedSchoolResponse>(url, body);
    }

    solveBulk(cells : IsPoint2d[], clusters : Cluster[], gridSize : number, gridSizeY : number, allowDisconnected : boolean, solutions : number, data : GridCellsProviderService) {
        var url = this.baseUrl + "/school/bulk?solutions=" + solutions;
        var body = {
            raster : cells,
            clusters : clusters.map(c => c.mapToSchema(data)),
            seed: null,
            gridSize : gridSize,
            gridSizeY : gridSizeY,
            allowDisconnected : allowDisconnected
        }

        return this.http.post<GenerateSchoolBulkResponse[]>(url, body);
    }


    setToData(cells : IsPoint2d[], gridSize : number, gridSizeY : number, data : EduSolveDataService, cellProvider : GridCellsProviderService){

        var clusters = data.clusters;
        var seed = data.useSeed ? data.seed : null;

        return this.solve(cells, clusters, seed, gridSize, gridSizeY, data.allowDisconnected, cellProvider).pipe(
            map((res) => {
                
                res.clusters.forEach(generatedCluster => {

                    var cluster = data.clusters.find(_c => generatedCluster.name == _c.name);
                    if(!cluster){
                        throw new Error("Invalid school : invalid cluster name");
                    }

                    cluster.cells = generatedCluster.cells.map(generatedCell => {
                        var cell = new ClusterCell(generatedCell.point);
                        cell.nortFacades = generatedCell.northFacades;
                        cell.eastFacades = generatedCell.eastFacades;
                        cell.southFacades = generatedCell.southFacades;
                        cell.westFacades = generatedCell.westFacades;
                        return cell;
                    })
                })

                return { 
                    clusters : data.clusters,
                    usedSeed : res.usedSeed
                };
            }));
    }

    setToShell(data : EduSolveDataService, shell : EduSolveShellService, gridSize : number, gridSizeY : number, cellProvider : GridCellsProviderService){

        var cells = this.prepareCells();

        return this.setToData(cells, gridSize, gridSizeY, data, cellProvider).pipe(
            map((res) => {
                shell.setSchool(res);
            }));
    }
}


