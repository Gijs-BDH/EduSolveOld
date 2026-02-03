import { Injectable } from '@angular/core';
import { PolylinePainterService } from '@app/modules/project-editor/models/PolylinePainterService';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { PolylineFactoryService } from '@app/modules/project-editor/service/polyline-factory.service';

@Injectable({
    providedIn: 'root'
})
export class WayPainterService extends PolylinePainterService {

    constructor(bagViewer : BagViewerService, polygonFactory : PolylineFactoryService) { 
        super(polygonFactory, bagViewer);
    }

}
