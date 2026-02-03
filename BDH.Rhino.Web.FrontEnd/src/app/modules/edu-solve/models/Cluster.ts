import { FixedPointDataModel } from './FixedPointDataModel';
import { ClusterCell } from "./DataTransferObjects/ClusterCell";
import { ShapeGrid } from './ShapeGrid';
import { ProjectVersionCluster } from './DataTransferObjects/ProjectVersionCluster';
import { GridCellsProviderService } from '../service/grid-cells-provider.service';

//connections are strings of names of the connected clusters.

export class Cluster {
    private _visible: boolean;

    public bvo: number;
    public lowestLevel: number;
    public highestLevel: number;
    public levels: number;


    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value) {
        this._visible = value;
    }

    public id : string = '';

    cells: ClusterCell[] = [];
    fixedPoints: FixedPointDataModel[] = [];

    public shape : ShapeGrid

    public constructor(public name: string, public color: string, bvo: number | undefined, vdMin: number, vdMax: number, verdiepingsHoogte: number, shape: boolean[], shapeWidth: number, public connections : string[]) {
        this.bvo = bvo ?? 300;
        this.lowestLevel = vdMin ?? 0;
        this.highestLevel = vdMax ?? 0;
        this.levels = verdiepingsHoogte ?? 1;
        this._visible = true;

        if(!shape.length){
            shape = [false];
            shapeWidth = 1;
        }
        this.shape = new ShapeGrid(shape, shapeWidth);
    }


    public mapToSchema(gridCellProvider : GridCellsProviderService) : ProjectVersionCluster{
        var schema : ProjectVersionCluster = {
            name : this.name,
            bvo : this.bvo,
            lowestLevel : this.lowestLevel,
            highestLevel : this.highestLevel,
            levels: this.levels,
            fixedPoints : this.fixedPoints.map(p => {
                return gridCellProvider.pointWorldToXy(p.location)
            }),
            shape: this.shape.values.map(i => i.value),
            connections: this.connections,
            shapeWidth: this.shape.columns,
            id: this.id,
            color : this.color
        }
        return schema;
    }

    public static fromSchema(schema : ProjectVersionCluster) : Cluster{
        return new Cluster(
            schema.name,
            schema.color,
            schema.bvo,
            schema.lowestLevel,
            schema.highestLevel,
            schema.levels,
            schema.shape,
            schema.shapeWidth,
            schema.connections
        )
    }

    public static createDefault(name : string, color : string, bvo : number, lowestLevel : number, highestLevel : number, levelHeight : number){
        return new Cluster(
            name,
            color,
            bvo, 
            lowestLevel,
            highestLevel,
            levelHeight,
            [false],
            1,
            []
        )
    }
}

