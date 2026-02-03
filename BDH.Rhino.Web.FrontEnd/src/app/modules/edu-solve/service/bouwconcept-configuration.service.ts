import { Injectable } from '@angular/core';
import { ConstructionConcept } from '../../../data/schema/models/ConstructionConcept';
import { ConstructionConceptProducer } from '@data/schema/models/ConstructConceptProducer';

@Injectable({
  providedIn: 'root'
})
export class BouwconceptConfigurationService {

    private _selectedProduct : ConstructionConcept | undefined;
    private _selectedManufacturer : ConstructionConceptProducer | undefined;

    public get selectedProduct(){
        return this._selectedProduct;
    }

    public get selectedManufacturer (){
        return this._selectedManufacturer;
    }

    public manufacturers : ConstructionConceptProducer[] = [];

    constructor() { 
        
    }

    public set(conceptId : string){
        var concept = this.selectedManufacturer?.products.find(i => i.id === conceptId);
        if(!concept){
            throw new Error("Could not find specified construction concept.");
        }
        this._selectedProduct = concept;
    }

    public setManufacturer(producerId : string){
        var producer = this.manufacturers.find(i => i.id === producerId);
        if(!producer){
            throw new Error("Cannot find specified construction concept producer.");
        }
        this._selectedManufacturer = producer;
        this.set(producer.products[0].id);
    }
}
