import { Injectable } from '@angular/core';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { IsPoint2d } from '../models/IsPoint2d';

@Injectable({
  providedIn: 'root'
})
export class MouseToScreenService {

  constructor(private bagViewer : BagViewerService) { }


  convert(ev : MouseEvent) : IsPoint2d{
    const rect = this.bagViewer.bagViewer.renderer.domElement.getBoundingClientRect();
    var x = ((ev.clientX - rect.left) / this.bagViewer.bagViewer.renderer.domElement.clientWidth) * 2 - 1;
    var y = -((ev.clientY - rect.top) / this.bagViewer.bagViewer.renderer.domElement.clientHeight) * 2 + 1;

    return {
        x: x,
        y: y
    }
  }
}
