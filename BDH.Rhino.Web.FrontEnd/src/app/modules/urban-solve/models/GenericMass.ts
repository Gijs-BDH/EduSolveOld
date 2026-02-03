import { IsBouwkostenBasisTypologie } from "@app/data/schema/models/bouwkosten-basis-typologie";
import { DataModel } from "../../project-editor/models/DataModel";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";

export class GenericMass extends DataModel{
    static defaultWidth : number = 6;
    static defaultHeight: number = 11;
    static defaultDepth: number = 9;

    width : number;
    height : number;
    depth : number;

    position : IsPoint2d;
    rotation : number;

    constructor(position : IsPoint2d, public typology : IsBouwkostenBasisTypologie, width? : number | undefined, height? : number | undefined, depth? : number | undefined, rotation? : number | undefined){
        super();
        
        this.position = position;

        this.width = width ?? GenericMass.defaultWidth;
        this.depth = depth ?? GenericMass.defaultDepth;
        this.height = height ?? GenericMass.defaultHeight;
        
        this.rotation = rotation ?? 0;
    }
}


