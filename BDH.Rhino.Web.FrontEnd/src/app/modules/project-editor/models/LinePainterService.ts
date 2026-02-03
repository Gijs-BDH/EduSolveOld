import { PolylineFactoryService } from '../service/polyline-factory.service';
import { BagViewerService } from '../service/bag-viewer.service';
import { PolylinePainterService } from './PolylinePainterService';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//extends the polylinepainterservice
//automatically confirms creation when two points are clicked.

export abstract class LinePainterService extends PolylinePainterService {
    constructor(polylineFactory: PolylineFactoryService, bagViewer: BagViewerService) {
        super(polylineFactory, bagViewer);
    }

    public override mouseClick(point: IsPoint2d): void {
        super.mouseClick(point);

        if (this.target.length == 2) {
            super.confirm(true);
        }
    }
}
