import { Injectable } from '@angular/core';
import { LinePainterService } from '@app/modules/project-editor/models/LinePainterService';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { PolylineFactoryService } from '@app/modules/project-editor/service/polyline-factory.service';

//simple implementation to allow to draw building concepts on a line.
@Injectable({
    providedIn: 'root'
})
export class CatalogPainterService extends LinePainterService {

    constructor(polylineFactory: PolylineFactoryService, bagViewer: BagViewerService) {
        super(polylineFactory, bagViewer);
    }
}
