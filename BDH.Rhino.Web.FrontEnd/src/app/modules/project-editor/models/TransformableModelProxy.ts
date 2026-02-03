import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { DeletableModelProxy } from "./DeletableModelProxy";

//extends the deleteablemodelproxy to a transformablemodelproxy. 
//exposes the applytransformation method which is called by the transform-controls-service upon transforming the model.

export abstract class TransformableModelProxy extends DeletableModelProxy{
    abstract applyTransformation(point : IsPoint2d, rotation : number) : void;
}

