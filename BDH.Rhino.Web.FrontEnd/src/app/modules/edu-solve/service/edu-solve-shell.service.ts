import { Injectable } from '@angular/core';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { EduSolveDataService } from './edu-solve-data.service';
import { ObstaclePainterService } from './obstacle-painter.service';
import { FixedPointPainterService } from './fixed-point-painter.service';
import { ObstacleDataModel } from '../models/ObstacleDataModel';
import { FixedPointDataModel } from '../models/FixedPointDataModel';
import { DataModelPainterCollectionService } from '@app/modules/project-editor/service/data-model-painter-collection.service';
import { NewProjectPainterService } from './new-project-painter.service';
import { BaseShell } from '@app/modules/project-editor/models/BaseShell';
import { DataModel } from '@app/modules/project-editor/models/DataModel';
import { SchoolModel } from '../models/SchoolModel';
import { Project } from '../models/Project';
import { Cluster } from '../models/Cluster';
import { EduSolveViewerService } from './edu-solve-viewer.service';

@Injectable({
    providedIn: 'root'
})
export class EduSolveShellService extends BaseShell {

    public get generatedSchool(): SchoolModel | undefined {
        return this.data.generatedSchoolClusters;
    }

    public get projectActive(): boolean {
        if (this.data.project) {
            return true;
        }

        return false;
    }

    constructor(
        private bagViewer: BagViewerService,
        private viewer: EduSolveViewerService,
        private data: EduSolveDataService,
        private polygonPainter: NewProjectPainterService,
        private obstaclePainter: ObstaclePainterService,
        private entrancePainer: FixedPointPainterService,
        private painterCollection: DataModelPainterCollectionService) {

        super();

        this.painterCollection.register(this.entrancePainer);
        this.painterCollection.register(this.polygonPainter);
        this.painterCollection.register(this.obstaclePainter);

    }

    override removeAllUserElements(): void {
        this.bagViewer.removeUserElements();
    }

    enumerateUserElements(): DataModel[] {
        var arr = [];
        for (var i = 0; i < this.data.obstacles.length; i++) {
            arr.push(this.data.obstacles[i]);
        }

        for (var i = 0; i < this.data.clusters.length; i++) {
            var cluster = this.data.clusters[i];
            for (var j = 0; j < cluster.fixedPoints.length; j++) {
                arr.push(cluster.fixedPoints[j]);
            }
        }
        return arr;
    }

    setSketchMode() {
        this.polygonPainter!.startDrawing().configureOnCommit(polygon => {
            if (polygon.length > 2) {
                this.setProjectData(
                    {
                        name: "new sketch",
                        id: "",
                        basePolygon: polygon,
                        versies: [],
                        owner: "",
                    });
            }
        });
    }

    setProjectData(project: Project) {
        this.setSchool(undefined);
        this.data.setProject(project);
        this.drawProjectToCanvas();
    }

    addObstacle() {
        this.obstaclePainter!.startDrawing().configureOnCommit(points => {
            this.data.obstacles = this.data.obstacles.concat(points.map(p => new ObstacleDataModel(p)));
            this.drawProjectToCanvas();
        })
    }

    addFixedPoint(cluster: Cluster) {
        if (!this.data.project) {
            return;
        }

        this.entrancePainer!.startDrawing().configureOnCommit(points => {
            var fixedPoints = points.map(i => {
                return new FixedPointDataModel(i)
            });
            cluster.fixedPoints = cluster.fixedPoints.concat(fixedPoints);
            this.drawProjectToCanvas();
        })
    }

    removeUserElements() {
        this.data.obstacles.length = 0;
    }

    drawProjectToCanvas() {
        this.viewer.drawProjectToCanvas();
    }

    setSchool(response?: SchoolModel | undefined) {
        this.data.generatedSchoolClusters = response;

        this.drawProjectToCanvas();
    }

    zoomAll() {
        if (!this.data.project) {
            return;
        }

        var nx = 0;
        var ny = 0;
        var avgx = 0;
        var avgy = 0;

        for (const m of this.data.project.basePolygon) {
            avgx += m.x;
            avgy += m.y
            nx++;
            ny++;
        }

        avgx /= nx;
        avgy /= ny;
        this.bagViewer.bagViewer.positionCamera(avgx, 0, avgy);
        this.bagViewer.bagViewer.pointCameraToNorth();
    }
}