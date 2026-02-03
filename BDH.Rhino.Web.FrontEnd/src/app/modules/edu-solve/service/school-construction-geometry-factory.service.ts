import { Injectable } from '@angular/core';
import { DataModelProxy } from '@app/modules/project-editor/models/DataModelProxy';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { Cluster } from '../models/Cluster';
import { ClusterCell } from '../models/DataTransferObjects/ClusterCell';
import { SchoolModel } from '../models/SchoolModel';
import { EduSolveDataService } from './edu-solve-data.service';
import { ExtrusionFactoryService } from './extrusion-factory.service';
import { GridCellsProviderService } from './grid-cells-provider.service';
import { GridConfigurationService } from './grid-configuration.service';
import { Vector2d } from '@app/shared/models/Vector2d';
import { Point2d } from '@app/shared/models/Point2d';
import { BouwconceptConfigurationService } from './bouwconcept-configuration.service';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class SchoolConstructionGeometryFactoryService {

    elementThickness = 0.382;

    constructor(
        private data: EduSolveDataService,
        private grid: GridConfigurationService,
        private extrusionFactory: ExtrusionFactoryService,
        private conceptConfiguration: BouwconceptConfigurationService,
        private polygonTools: PolygonToolsService,
        private gridCellProvider: GridCellsProviderService) {
    }

    create(clusters: SchoolModel, opaque : boolean): DataModelProxy {
        var school = this.createSchool(clusters.clusters, opaque);
        return school;
    }


    private createSchool(clusters: Cluster[], opaque : boolean): DataModelProxy {
        if (!this.data.project) {
            throw new Error("Cannot generate a school because no project has been set.");
        }

        var group = new DataModelProxy();
        clusters.forEach(cluster => {
            if (!cluster.visible) return;

            var clusterGeometry = this.createCluster(cluster, opaque);
            group.add(clusterGeometry);
        })

        return group;
    }

    private createCluster(cluster: Cluster, opaque : boolean): THREE.Group {
        var group = new THREE.Group();
        cluster.cells.forEach(cell => {
            var cellGeometry = this.createClusterCell(cell, cluster.color, cluster.levels, opaque);
            group.add(cellGeometry);
        })

        return group;
    }

    private createClusterCell(cell: ClusterCell, color: string, floorSpan: number, opaque : boolean): THREE.Group {
        if (!this.conceptConfiguration.selectedProduct) {
            throw new Error();
        }

        var color = 'grey'

        var basePoint = cell.point;
        var rotatedPoint = this.gridCellProvider.pointXyToWorld(cell.point);
        var z = (basePoint.z * this.grid.verdiepingshoogte);
        var tile = this.gridCellProvider.getTilesWorld().find(t => this.polygonTools.pointInPolygon(rotatedPoint, t));
        if (!tile ) {
            throw new Error("Invalid school.");
        }

        var tileXY = tile.map(p => this.gridCellProvider.pointWorldToXy(p))
        var constructionCells = this.gridCellProvider.getConstructionTilesInMainTileXY(tileXY);
        var constructionCellsWorld = constructionCells.map(c => c.map(_c => this.gridCellProvider.pointXyToWorld(_c)));
        var floorElements = constructionCellsWorld.map(c =>{ 
            var model = this.extrusionFactory.create(c, cell.point.z * this.grid.verdiepingshoogte, this.elementThickness, color, false)
            return model
        })

        var group = new THREE.Group();

        for(var i = 0; i< floorElements.length; i++){
            group.add(floorElements[i]);
        }

        var avgx = 0;
        var avgy = 0;
        for (var i = 0; i < 4; i++) {
            avgx += tile[i].x;
            avgy += tile[i].y;
        }
        avgx /= 4;
        avgy /= 4;
        var halfx = this.grid.gridSize / 2 - 0.1
        var halfy = this.grid.gridSizeY / 2 - 0.1
        var center = new Point2d(avgx, avgy);
        var columnPoints = [
            center.add(new Vector2d(-this.elementThickness, -this.elementThickness)),
            center.add(new Vector2d(-this.elementThickness, this.elementThickness)),
            center.add(new Vector2d(this.elementThickness, this.elementThickness)),
            center.add(new Vector2d(this.elementThickness, -this.elementThickness))
        ]
        var beamPointsBase = [
            center.add(new Vector2d(-this.elementThickness, -halfy)),
            center.add(new Vector2d(-this.elementThickness, halfy)),
            center.add(new Vector2d(this.elementThickness, halfy)),
            center.add(new Vector2d(this.elementThickness, -halfy))
        ]
        var n = this.grid.gridSize / (this.conceptConfiguration.selectedProduct.spanLength / 1000);

        var columnHeight = this.grid.verdiepingshoogte * floorSpan;

        for (var i = 0; i < n + 1; i++) {

            var translationX = SchoolConstructionGeometryFactoryService.map(i, 0, n, -halfx + this.elementThickness, halfx - this.elementThickness);
            var topColumn = this.extrusionFactory.create(
                columnPoints.map(p => this.polygonTools.rotatePoint(p.add(new Vector2d(translationX, halfy - this.elementThickness)), center, this.grid.gridRotation)), z, columnHeight, color, true)
            group.add(topColumn);
            var bottomColumn = this.extrusionFactory.create(
                columnPoints.map(p => this.polygonTools.rotatePoint(p.add(new Vector2d(translationX, -halfy + this.elementThickness)), center, this.grid.gridRotation)), z, columnHeight, color, true)
            group.add(bottomColumn);

            var beamStartElevation = z - this.elementThickness;
            var beamPoints = beamPointsBase
                .map(p => p.add(new Vector2d(translationX, 0)))
                .map(p => p.rotateAround(center, this.grid.gridRotation))

            var beam = this.extrusionFactory.create(beamPoints, beamStartElevation, this.elementThickness, color, true);
            group.add(beam);
        }

        return group;
    }

    private static clamp(input: number, min: number, max: number): number {
        return input < min ? min : input > max ? max : input;
    }

    private static map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        return SchoolConstructionGeometryFactoryService.clamp(mapped, out_min, out_max);
    }
}
