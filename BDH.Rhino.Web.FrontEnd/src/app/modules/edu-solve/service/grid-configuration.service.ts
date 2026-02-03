import { Injectable } from '@angular/core';
import { ProjectVersion } from '../models/DataTransferObjects/ProjectVersion';
import { BouwconceptConfigurationService } from './bouwconcept-configuration.service';

@Injectable({
    providedIn: 'root'
})
export class GridConfigurationService {

    public gridRotation: number = 0;
    public gridShift: number = 0;
    public verdiepingshoogte : number = 3;
    

    private _smallestGridSize = 14.4;
    public get smallestGridSize(){
        return this._smallestGridSize;
    }

    public set smallestGridSize(value : number){
        this._smallestGridSize = value;
    }

    public get necessaryTileSpanX() : number {
        if(!this.bouwconcept.selectedProduct){
            return 10;
        }

        return Math.ceil(this._smallestGridSize / (this.bouwconcept.selectedProduct.spanLength / 1000))
    }
    public get necessaryTileSpanY() : number {
        if(!this.bouwconcept.selectedProduct){
            return 10;
        }

        return Math.ceil(this._smallestGridSize / (this.bouwconcept.selectedProduct.spanWidth / 1000));
    }

    public get gridSize () : number{
        if(!this.bouwconcept.selectedProduct){
            return 10;
        }

        return this.necessaryTileSpanX * (this.bouwconcept.selectedProduct.spanLength / 1000)
    } 

    public get gridSizeY() : number{
        if(!this.bouwconcept.selectedProduct){
            return 10;
        }

        return this.necessaryTileSpanY * (this.bouwconcept.selectedProduct.spanWidth / 1000)
    }


    constructor(private bouwconcept : BouwconceptConfigurationService) { 

    }

    setFromVersion(version : ProjectVersion){
        this.gridRotation = version.gridRotation;
        this.gridShift = version.gridTranslation;
        this.verdiepingshoogte = version.levelHeight;
        this.smallestGridSize = version.minimumGridSize;
    }
}
