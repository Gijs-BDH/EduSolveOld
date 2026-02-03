import { Injectable } from '@angular/core';
import { PolygonPainterService } from '@app/modules/project-editor/models/PolygonPainterService.service';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectBoundaryPainterService extends PolygonPainterService {

    constructor(bagViewer: BagViewerService) {
        super(bagViewer);
    }
}
