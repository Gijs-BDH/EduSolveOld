import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as THREE from 'three';
import { BuildingConceptGeometryLoaderService } from '../../service/building-concept-geometry-loader.service';
import { SimpleModelViewerService } from '@app/shared/service/simple-model-viewer.service';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';

@Component({
  selector: 'app-bouwconcept-info',
  templateUrl: './bouwconcept-info.component.html',
  styleUrls: ['./bouwconcept-info.component.scss']
})
export class BouwconceptInfoComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: BuildingConcept, 
        private geometryLoader : BuildingConceptGeometryLoaderService,
        private viewer : SimpleModelViewerService){
        
    }
    ngOnInit(): void {
        const canvas = document.getElementById("viewerCanvas");
        if(!canvas){
            throw new Error("Er is geen canvas om de model viewer op te tonen.")
        }

        canvas.innerHTML = '' ;
        this.viewer.initToCanvas(canvas);
        this.geometryLoader.getOrDownloadSync(this.data.id, (geom: THREE.Group) => {
            this.viewer.addModel(geom);
        })
    }
}
