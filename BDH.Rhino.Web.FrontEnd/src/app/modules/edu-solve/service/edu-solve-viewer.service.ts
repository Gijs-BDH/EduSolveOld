import { Injectable } from '@angular/core';
import { PolygonFactory } from '@app/modules/project-editor/service/polygon-factory.service';
import { Point2d } from '@app/shared/models/Point2d';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { FixedPointProxy } from '../models/FixedPointProxy';
import { ObstacleProxy } from '../models/ObstacleProxy';
import { EduSolveDataService } from './edu-solve-data.service';
import { EntranceModelFactoryService } from './entrance-model-factory.service';
import { GridCellsProviderService } from './grid-cells-provider.service';
import { GridConfigurationService } from './grid-configuration.service';
import { ObstacleModelFactoryService } from './obstacle-model-factory.service';
import { SchoolBuildingGeometryFactoryService } from './school-building-geometry-factory.service';
import { SchoolConstructionGeometryFactoryService } from './school-construction-geometry-factory.service';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';

@Injectable({
    providedIn: 'root'
})
export class EduSolveViewerService {

    public polygon = true;
    public gridProgramma = true;
    public gridConcept = true;
    public drawClusters = true;
    public drawConstruction = false;
    public transparant = true;

    constructor(
        private bagViewer: BagViewerService,
        private data: EduSolveDataService,
        private schoolFactory: SchoolBuildingGeometryFactoryService,
        private schoolConstructionFactory: SchoolConstructionGeometryFactoryService,
        private obstacleModelFactory: ObstacleModelFactoryService,
        private entranceModelFactory: EntranceModelFactoryService,
        private polygonTools: PolygonToolsService,
        private polygonFactory: PolygonFactory,
        private gridCellProvider: GridCellsProviderService) { }


    drawProjectToCanvas() {
        this.bagViewer.removeUserElements();

        if (!this.data.project) {
            return;
        }

        if (this.polygon) {
            var basePolgyonPoints = this.data.project.basePolygon.map(i => new Point2d(i.x, i.y));
            var basePolygon = this.polygonFactory.create(basePolgyonPoints, 'lime', 1);

            this.bagViewer.bagViewer.scene.add(basePolygon);
        }


        var tileRaster = this.gridCellProvider.getTilesWorld();
        var tileRasterConcept = this.gridCellProvider.getTilesConceptWorld();

        if (this.gridProgramma) {
            this.drawGrid(tileRaster);
        }

        if (this.gridConcept) {
            this.drawConstructionGrid(tileRasterConcept)
        }

        if (this.data.generatedSchoolClusters) {
            this.drawSchool();
        }

        this.drawObstacles();
        this.drawFixedPoints();

        this.bagViewer.ensureRerender();
    }

    drawGrid(tileRaster: Point2d[][]) {
        tileRaster.forEach(tile => {

            var excluded = this.data.obstacles.length == 0 ? false : this.data.obstacles.find(o => {
                return this.polygonTools.pointInPolygon(o.location, tile)
            });
            var color = excluded ? 'red' : 'transparant';
            var tileGeometry = this.polygonFactory.create(tile, color, 1);

            this.bagViewer.addUserElement(tileGeometry);
        })
    }

    drawConstructionGrid(tileRasterConcept: Point2d[][][]) {
        tileRasterConcept.forEach(tile => {

            tile.forEach(_tile => {
                var tileGeometry = this.polygonFactory.create(_tile, 'transparant', 1);

                this.bagViewer.addUserElement(tileGeometry);
            })

        })
    }

    drawSchool() {

        if (this.drawClusters) {
            this.drawSchoolClusters();
        }

        if (this.drawConstruction) {
            this.drawSchoolConsruction();
        }
    }

    drawSchoolClusters() {
        if (!this.data.generatedSchoolClusters) {
            return;
        }

        var school = this.schoolFactory.create(this.data.generatedSchoolClusters, !this.transparant);
        this.bagViewer.addUserElement(school);
    }

    drawSchoolConsruction() {
        if (!this.data.generatedSchoolClusters) {
            return;
        }

        var construction = this.schoolConstructionFactory.create(this.data.generatedSchoolClusters, !this.transparant);
        this.bagViewer.addUserElement(construction);
    }

    drawObstacles() {
        this.data.obstacles.forEach(o => {
            var obstacleModel = this.obstacleModelFactory.getCached()

            var proxy = new ObstacleProxy(o, this, this.data);
            proxy.position.set(o.location.x, 0, o.location.y);
            proxy.add(obstacleModel);

            this.bagViewer.addUserElement(proxy);
        })
    }

    drawFixedPoints() {
        this.data.clusters.forEach(cluster => {
            cluster.fixedPoints.forEach(p => {
                var model = this.entranceModelFactory.create(cluster.color);

                var proxy = new FixedPointProxy(p, this, this.data)
                proxy.position.set(p.location.x, 0, p.location.y);
                proxy.add(model);

                this.bagViewer.addUserElement(proxy);
            })
        })
    }
}
