import { Injectable } from '@angular/core';
import { DataModelPainterCollectionService } from './data-model-painter-collection.service';
import { TransformControlsService } from './transform-controls.service';
import { BoxHelperService } from './box-helper.service';

//Listens to enter and escape keys, confirming or cancelling the activated data model painter.

@Injectable({
    providedIn: 'root'
})
export class KeyboardEventDispatcherService {

    constructor(private painters: DataModelPainterCollectionService, private transformControls : TransformControlsService, private boxHelper : BoxHelperService) {
        
    }

    public init(target : Window){
        target.addEventListener('keyup', this.keyUp.bind(this));
    }

    private keyUp(ev : KeyboardEvent){
        var key = ev.key;

        switch(key){
            case 'esc':
                case 'Esc':
                    case 'escape':
                        case 'Escape':
                            this.escPressed();
                            break;

            case 'enter':
                case 'Enter':
                    this.enterPressed();
                    break;
        }

        ev.preventDefault();
    }

    private escPressed(){
        this.painters.painters.forEach(p => p.confirm(false));

        this.transformControls.detach(false);

        this.boxHelper.detach();

    }

    private enterPressed(){
        this.painters.painters.forEach(p => p.confirm(true));

        this.transformControls.detach(true);
    }
}
