import { Injectable } from '@angular/core';
import { Point2d } from '@app/shared/models/Point2d';
import { SelectableModelProxy } from '../models/SelectableModelProxy';
import { BagCasterService } from './bag-caster.service';
import { BagViewerService } from './bag-viewer.service';
import { BaseMapCasterService } from './base-map-caster.service';
import { DataModelPainterCollectionService } from './data-model-painter-collection.service';
import { TransformControlsService } from './transform-controls.service';
import { DataModelCasterService } from './data-model-caster.service';
import { MouseToScreenService } from '@app/shared/service/mouse-to-screen.service';
import { BoxHelperService } from './box-helper.service';

//The main service to subscribe to- and handle mouse events.
//initialize to an html element first
//dispatches mouse events to caster services (bag caster, map caster, modelcaster)
//remeber to normalize x and y values of mouse position on the screen from -1 to 1 before dispatching

@Injectable({
    providedIn: 'root'
})
export class MouseEventDispatcherService {

    private lastMouseDown : Point2d = new Point2d(0,0);
    private lastMouseUp : Point2d = new Point2d(0,0);

    constructor(
        private readonly painters: DataModelPainterCollectionService, 
        private readonly mapCaster : BaseMapCasterService, 
        private readonly bagViewer : BagViewerService, 
        private readonly mouseEvent : MouseToScreenService, 
        private readonly transformControls : TransformControlsService, 
        private readonly modelCaster : DataModelCasterService, 
        private readonly boxHelper : BoxHelperService,
        private readonly bagCaster : BagCasterService) {

    }

    public initToCanvas(htmlElement: HTMLElement) {
        htmlElement.addEventListener('mousemove', this.mouseMove.bind(this));

        htmlElement.addEventListener('mousedown', this.mouseDown.bind(this))

        htmlElement.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    private mouseMove(ev : MouseEvent){
        if(ev.defaultPrevented){
            return;
        }

        var xy = this.mouseEvent.convert(ev);

        var currentlyPainting = this.painters.painters.find(p => p.isDrawing);
        if(currentlyPainting){
            var pointOnMap = this.mapCaster.cast(xy.x, xy.y);
            if(pointOnMap){
                currentlyPainting.mouseMove(pointOnMap);
            }
        }
    }

    private mouseDown(ev : MouseEvent){
        if(ev.defaultPrevented){
            return;
        }

        if(ev.button != 0){
            return;
        }

        const rect = this.bagViewer.bagViewer.renderer.domElement.getBoundingClientRect();
        var x = ((ev.clientX - rect.left) / this.bagViewer.bagViewer.renderer.domElement.clientWidth) * 2 - 1;
        var y = -((ev.clientY - rect.top) / this.bagViewer.bagViewer.renderer.domElement.clientHeight) * 2 + 1;

        this.lastMouseDown = new Point2d(x, y);
    }

    private mouseUp(ev : MouseEvent){
        if(ev.defaultPrevented){
            return;
        }
        
        if(ev.button != 0){
            return;
        }
        
        const rect = this.bagViewer.bagViewer.renderer.domElement.getBoundingClientRect();
        //normalize x and y values from -1 to 1
        var x = ((ev.clientX - rect.left) / this.bagViewer.bagViewer.renderer.domElement.clientWidth) * 2 - 1;
        var y = -((ev.clientY - rect.top) / this.bagViewer.bagViewer.renderer.domElement.clientHeight) * 2 + 1;

        this.lastMouseUp = new Point2d(x, y);

        var mouseTravelDistance = this.lastMouseDown.distance(this.lastMouseUp) ;
        if(mouseTravelDistance < 0.01){
            this.click(x, y);
        }
    }

    private click(x : number, y : number){
        this.transformControls.detach(true);
        this.boxHelper.detach();
        this.bagViewer.enumerateUserElements().forEach(u => {
            if(u instanceof SelectableModelProxy){
                u.isSelected = false
            } 
        });

        var currentlyPainting = this.painters.painters.find(p => p.isDrawing);
        if(currentlyPainting){

            var pointOnMap = this.mapCaster.cast(x, y);
            if(pointOnMap){
                currentlyPainting.mouseClick(pointOnMap);
            }

            return;
        }
        
        if(this.bagViewer.renderBag && this.bagCaster.cast(x, y)){
            return;
        }

        var selected = this.modelCaster.trySelect(x, y);
        if(selected){
            this.bagViewer.bagViewer.clearSelection();
            return;
        }
    }
}
