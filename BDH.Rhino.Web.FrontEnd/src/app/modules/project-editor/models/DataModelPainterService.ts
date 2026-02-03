import { IsPoint2d } from '@app/shared/models/IsPoint2d';
import { BagViewerService } from '../service/bag-viewer.service';
import { DataModelProxy } from "./DataModelProxy";

//provides an abstract class meant to be overridden by user model painters.
//base functionality has been fully coverd by this class so no need to worry about subscribing to mouse-/ keyboard events or cancelling/confirming etc.
//register any implementation with the datamodelpaintercollection service. 
//public methods are called by mouseeventdispatcher en keyboarddispatcher services
//only required method override is create ghost from points
//note that the provided argument is the clicked points in map (NOT SCREEN) space. 
//the last point of the array is the current mouse position over the 3d map
//also note that the points are 2d, so no 3d drawing is supported (yet) by this class.
//call configure on commit to handle the confirm method

export abstract class DataModelPainter {

    protected drawing : boolean = false;
    protected target: IsPoint2d[] = [];
    protected ghost: DataModelProxy | undefined;
    protected commit : (target: IsPoint2d[]) => void = () => {}; 

    public get isDrawing() {
        return this.drawing;
    }

    constructor(protected bagViewer: BagViewerService) {

    }

    public startDrawing() {
        this.drawing = true;
        return this;
    }

    public configureOnCommit(commit : (target: IsPoint2d[]) => void){
        this.commit = commit.bind(this);
        return this;
    }

    public mouseMove(point : IsPoint2d){
        if(this.ghost){
            this.bagViewer.removeUserElement(this.ghost);
        }

        var ghostPoints = this.target.concat([point]);
        this.ghost = this.createGhost(ghostPoints)

        this.bagViewer.addUserElement(this.ghost);
        this.bagViewer.ensureRerender();
    }

    public mouseClick(point : IsPoint2d){
        this.target.push(point);
        this.mouseMove(point);
    }   

    public confirm(commit : boolean) {
        try{
            if (commit) {
                this.commit(this.target);
            }
    
            if (this.ghost) {
                this.bagViewer.removeUserElement(this.ghost);
                this.bagViewer.ensureRerender();
            }
        }
        catch{
            
        }
        finally{
            this.ghost = undefined;
            this.target = [];
            this.commit = () => {};
            this.drawing = false;
        }
    }




    protected abstract createGhost(target: IsPoint2d[]): DataModelProxy;

}
