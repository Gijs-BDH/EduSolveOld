import { Injectable } from '@angular/core';
import { DataModelProxy } from "@app/modules/project-editor/models/DataModelProxy";
import { PolygonFactory } from '@app/modules/project-editor/service/polygon-factory.service';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { Vector3 } from 'three';
import { EduSolveDataService } from './edu-solve-data.service';
import { ClusterCell } from "../models/DataTransferObjects/ClusterCell";
import { Cluster } from "../models/Cluster";
import { ExtrusionFactoryService } from './extrusion-factory.service';
import { GridConfigurationService } from './grid-configuration.service';
import { SchoolModel } from '../models/SchoolModel';
import { GridCellsProviderService } from './grid-cells-provider.service';
import * as THREE from 'three';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';
import { IsPoint3d } from '@app/shared/models/IsPoint3d';

@Injectable({
    providedIn: 'root'
})
export class SchoolBuildingGeometryFactoryService {

    private opaque : boolean = false;

    constructor(
        private readonly data: EduSolveDataService,
        private readonly grid: GridConfigurationService,
        private readonly extrusionFactory: ExtrusionFactoryService,
        private readonly polygonTools: PolygonToolsService,
        private readonly polygonFactory: PolygonFactory,
        private readonly gridCellProvider : GridCellsProviderService) {
    }

    public create(clusters: SchoolModel, opaque : boolean = false): DataModelProxy {
        this.opaque = opaque;
        var school = this.createSchool(clusters.clusters);
        return school;
    }


    private createSchool(clusters: Cluster[]): DataModelProxy {
        if (!this.data.project) {
            throw new Error("Cannot generate a school because no project has been set.");
        }

        var group = new DataModelProxy();
        clusters.forEach(cluster => {
            if (!cluster.visible) return;

            var clusterGeometry = this.createCluster(cluster);
            group.add(clusterGeometry);
        })

        return group;
    }

    private createCluster(cluster: Cluster): THREE.Group {
        var group = new THREE.Group();
        cluster.cells.forEach(cell => {
            var cellGeometry = this.createClusterCell(cell, cluster.color, cluster.levels);
            group.add(cellGeometry);
        })

        return group;
    }

    private createClusterCell(cell: ClusterCell, color: string, floorSpan: number): THREE.Group {
        var rotatedPoint = this.gridCellProvider.pointXyToWorld(cell.point);
        var z = (cell.point.z * this.grid.verdiepingshoogte);
        var tileWorld = this.gridCellProvider.getTilesWorld().find(t => this.polygonTools.pointInPolygon(rotatedPoint, t));
        if (!tileWorld) {
            throw new Error("Invalid school.");
        }

        var tileMesh = this.polygonFactory.create(tileWorld, color, color, this.opaque);
        tileMesh.position.add(new Vector3(0, z, 0));

        var roofMesh = this.polygonFactory.create(tileWorld, color, color, this.opaque);
        roofMesh.position.add(new Vector3(0, z, 0));
        roofMesh.position.add(new Vector3(0, this.grid.verdiepingshoogte * floorSpan, 0));

        var group = new THREE.Group();
        group.add(tileMesh);
        group.add(roofMesh);

        var tileXY = tileWorld.map(p => this.gridCellProvider.pointWorldToXy(p))
        var facades = this.createClusterCellFacade(cell, tileXY);
        group.add(facades);

        return group;
    }

    private createClusterCellFacade(cell: ClusterCell, tile: IsPoint2d[]): THREE.Group {
        var xs = tile.map(i => i.x);
        xs.sort((a, b) => a > b ? 1 : -1);
        var ys = tile.map(i => i.y);
        ys.sort((a, b) => a > b ? 1 : -1);

        var group = new THREE.Group();
        for (var level = 0; level < cell.nortFacades.length; level++) {
            var facadeVisible = cell.nortFacades[level];
            if (!facadeVisible) {
                continue;
            }

            var z = (cell.point.z * this.grid.verdiepingshoogte) + (level * this.grid.verdiepingshoogte);
            var line = this.createEndPoints(z, xs, ys, 0, ys.length - 1, xs.length - 1, ys.length - 1);

            group.add(this.createFacade(z, line[0], line[1]));
        }

        for (var level = 0; level < cell.eastFacades.length; level++) {
            var facadeVisible = cell.eastFacades[level];
            if (!facadeVisible) {
                continue;
            }

            var z = (cell.point.z * this.grid.verdiepingshoogte) + (level * this.grid.verdiepingshoogte);
            var line = this.createEndPoints(z, xs, ys, xs.length - 1, 0, xs.length - 1, ys.length - 1);

            group.add(this.createFacade(z, line[0], line[1]));
        }

        for (var level = 0; level < cell.southFacades.length; level++) {
            var facadeVisible = cell.southFacades[level];
            if (!facadeVisible) {
                continue;
            }

            var z = (cell.point.z * this.grid.verdiepingshoogte) + (level * this.grid.verdiepingshoogte);
            var line = this.createEndPoints(z, xs, ys, 0, 0, xs.length - 1, 0);

            group.add(this.createFacade(z, line[0], line[1]));
        }

        for (var level = 0; level < cell.westFacades.length; level++) {
            var facadeVisible = cell.westFacades[level];
            if (!facadeVisible) {
                continue;
            }

            var z = (cell.point.z * this.grid.verdiepingshoogte) + (level * this.grid.verdiepingshoogte);
            var line = this.createEndPoints(z, xs, ys, 0, 0, 0, ys.length - 1);

            group.add(this.createFacade(z, line[0], line[1]));
        }

        return group;
    }

    private createEndPoints(elevationOfFacade: number, xs: number[], ys: number[], x1: number, y1: number, x2: number, y2: number): IsPoint3d[] {
        var nortWestPoint = {
            x: xs[x1],
            y: ys[y1],
            z: elevationOfFacade
        }
        var nortEastPoint = {
            x: xs[x2],
            y: ys[y2],
            z: elevationOfFacade
        }

        return [nortWestPoint, nortEastPoint];
    }

    private createFacade(elevation: number, start: IsPoint3d, end: IsPoint3d) {
        this.polygonTools.rotatePointInPlace(start, this.gridCellProvider.centerOfGravity, this.grid.gridRotation)
        this.polygonTools.rotatePointInPlace(end, this.gridCellProvider.centerOfGravity, this.grid.gridRotation)
        var geometry = this.extrusionFactory.create([start, end], elevation, this.grid.verdiepingshoogte, 'white', this.opaque);
        
        return geometry;
    }
}