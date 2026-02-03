import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cluster } from '@app/modules/edu-solve/models/Cluster';
import { ShapeGrid } from '../../../models/ShapeGrid';

@Component({
  selector: 'app-shape-dialog',
  templateUrl: './shape-dialog.component.html',
  styleUrls: ['./shape-dialog.component.scss']
})
export class ShapeDialogComponent {
    public get shapeWidth (){
        return this.shape.columns;
    }

    shape : ShapeGrid ;
    public math : Math = window.Math;

    constructor(@Inject(MAT_DIALOG_DATA) public cluster: Cluster, private dialog : MatDialogRef<ShapeDialogComponent>){
        this.shape = cluster.shape;
    } 

    getColor(value : boolean){
        return value ? "#32a852" : "#a83232"
    }
    
    save(){
        this.cluster.shape = this.shape;
        this.dialog.close();
    }

    increase(){
        this.cluster.shape.addColumn();
        this.cluster.shape.addRow();
    }

    decrease(){
        this.cluster.shape.removeColumn();
        this.cluster.shape.removeRow();
    }
}


