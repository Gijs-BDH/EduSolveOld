import { OnInit, AfterViewInit, Component, AfterContentInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { delay, switchMap } from 'rxjs';
import { BagViewerService } from '../service/bag-viewer.service';
import { KeyboardEventDispatcherService } from '../service/keyboard-event-dispatcher.service';
import { MouseEventDispatcherService } from '../service/mouse-event-dispatcher.service';
import { TransformControlsService } from '../service/transform-controls.service';
import { RulerService } from '../service/ruler.service';
import { DataModelPainterCollectionService } from '../service/data-model-painter-collection.service';
import { BulldozerService } from '../service/bulldozer.service';
import { BoxHelperService } from '../service/box-helper.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements AfterContentInit {
    
    public get threeD() {
        return this.viewer.bagViewer.renderBag;
    }
    public set threeD(val){
        localStorage.setItem('3d', val.toString());
        this.viewer.bagViewer.renderBag = val;
        this.viewer.bagViewer.needsRerender = 1;
    }

    constructor(
        private viewer : BagViewerService, 
        private transformControls : TransformControlsService, 
        private boxHelper : BoxHelperService,
        private mouseEvents : MouseEventDispatcherService, 
        private keyboardEvents : KeyboardEventDispatcherService,
        public ruler : RulerService,
        private drawables : DataModelPainterCollectionService,
        public auth : AuthService,
        public bulldozer : BulldozerService){

            this.drawables.register(this.ruler);
            
    }



    ngAfterContentInit(): void {
        var canvas = document.getElementById("project-editor-canvas");
        if(!canvas){
            throw new Error("Kon geen canvas vinden om de viewer op te plaatsen.");
        }

        canvas.innerHTML = '';

        var bagViewer = this.viewer.bagViewer;
        bagViewer.init(canvas);
        bagViewer.positionCamera(0, 190000, 0);
        bagViewer.pointCameraToNorth();
        bagViewer.reinitBasemap();    

        var _3dSetting = localStorage.getItem("3d");
        if(_3dSetting){
            this.threeD = _3dSetting == 'true';
        }


        this.viewer.initEvents();
        this.mouseEvents.initToCanvas(canvas);
        this.keyboardEvents.init(window);
        this.transformControls.init();
        this.boxHelper.init();

    }

    reavealHidden = false;
    hideSelected() {
        this.viewer.bagViewer.hideSelected();
    }

    unhideSelected() {
        this.viewer.bagViewer.unHideSelected();
    }

    tempreveal = false;
    hideShow() {
        if(this.tempreveal){
            this.viewer.bagViewer.revealHiddenTemporary();
        } else{
            this.viewer.bagViewer.resetTemporaryReveal();
        }
        
        this.tempreveal = !this.tempreveal;

    }



    measure(){
        this.drawables.setActive(this.ruler);
    }
   


    bulldoze(){
        if(this.bulldozer.bullDozing){
            this.bulldozer.stop();
        } else {
            this.bulldozer.start();
        }
        
    }
}
