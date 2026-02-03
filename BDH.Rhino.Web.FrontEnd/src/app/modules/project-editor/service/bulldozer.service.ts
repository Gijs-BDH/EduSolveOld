import { Injectable } from '@angular/core';
import { BagViewerService } from './bag-viewer.service';
import { BagCasterService } from './bag-caster.service';
import { MouseToScreenService } from '@app/shared/service/mouse-to-screen.service';

//Subscribes to mouse movements, when started casts the 3d bag buildings beneath the mouse. When mouse pressed, hides 3d bag buildings beneath the mouse. Escape and enter keys stops listening.

@Injectable({
    providedIn: 'root'
})
export class BulldozerService {

    public get bullDozing() : boolean{
        return this.htmlElement !== undefined;
    }

    private htmlElement: HTMLElement | undefined;
    private bulldozerActive : boolean = false;

    private _mouseMove : (ev : MouseEvent) => void;
    private _mouseDown : (ev : MouseEvent) => void;
    private _mouseUp : (ev : MouseEvent) => void;

    constructor(private readonly bagViewer : BagViewerService, private readonly bagCaster : BagCasterService, private readonly mouseToScreen : MouseToScreenService) { 
        window.addEventListener('keyup', (ev) => {
            if(ev.key === 'Escape' || 
                ev.key === 'Enter' ||
                ev.key === ' ')
                {
                    this.stop();
                }
        });

        this._mouseMove = this.mouseMove.bind(this);
        this._mouseDown = this.mouseDown.bind(this);
        this._mouseUp = this.mouseUp.bind(this);
    }



    public start() {
        var htmlElement = this.bagViewer.canvas;

        if(this.htmlElement){
            return;
        }

        htmlElement.addEventListener('mousemove', this._mouseMove);
        htmlElement.addEventListener('mousedown', this._mouseDown);
        htmlElement.addEventListener('mouseup', this._mouseUp);
        
        this.htmlElement = htmlElement;
        this.bulldozerActive = false;

        this.bagViewer.orbitControls.enabled = false;
    }



    public stop() {
        this.bulldozerActive = false;
        this.bagViewer.orbitControls.enabled = true;
        if(!this.htmlElement){
            return;
        }

        this.htmlElement.removeEventListener('mousemove', this._mouseMove);
        this.htmlElement.removeEventListener('mousedown', this._mouseDown);
        this.htmlElement.removeEventListener('mouseup', this._mouseUp);
        
        this.htmlElement = undefined;
    }

    private mouseDown(ev : MouseEvent){
        this.bulldozerActive = true;
    }

    private mouseUp(ev : MouseEvent){
        this.bulldozerActive = false;
    }

    private mouseMove(ev : MouseEvent){
        if(!this.bulldozerActive){
            return;
        }

        var xy = this.mouseToScreen.convert(ev);
        var hitBuilding = this.bagCaster.tryHitBuilding(xy.x, xy.y);
        if(!hitBuilding){
            return;
        }

        this.bagViewer.bagViewer.addToSelection(hitBuilding.object, hitBuilding.id);
        this.bagViewer.bagViewer.hideSelected();
    }
}
