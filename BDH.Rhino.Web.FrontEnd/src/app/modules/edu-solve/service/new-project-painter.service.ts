import { Injectable } from '@angular/core';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { PolygonPainterService } from '@app/modules/project-editor/models/PolygonPainterService.service';

@Injectable({
  providedIn: 'root'
})
export class NewProjectPainterService extends PolygonPainterService{

  constructor(bagViewer: BagViewerService) { 
    super(bagViewer)
  }
}
