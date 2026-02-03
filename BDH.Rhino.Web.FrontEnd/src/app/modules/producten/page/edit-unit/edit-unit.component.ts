import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BouwconceptService } from '@app/data/service/bouwconcept.service';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { GlbValidatorService } from '@app/shared/service/glb-validator.service';
import { UpdateBouwconceptRequest } from '@app/data/schema/requests/NewBouwconceptRequest';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { SimpleModelViewerService } from '@app/shared/service/simple-model-viewer.service';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';

@Component({
    selector: 'app-edit-unit',
    templateUrl: './edit-unit.component.html',
    styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {


    form!: FormGroup;


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { properties : BuildingConcept, catalog : BuildingConceptCatalog },
        private dialogRef: MatDialogRef<EditUnitComponent>,
        private geometryLoader: BuildingConceptGeometryLoaderService,
        private conceptService: BouwconceptService,
        private formBuilder: FormBuilder,
        private validation : GlbValidatorService,
        private viewer : SimpleModelViewerService) {
            

        this.form = this.formBuilder.group({
            id: [this.data.properties.id, Validators.required],
            name: [this.data.properties.name, Validators.required],
            bvoPerUnit: [this.data.properties.bvoPerUnit, Validators.required],
            m3PerUnit: [this.data.properties.m3PerUnit, Validators.required],
            unitWidth: [this.data.properties.width, Validators.required],
            unitDepth: [this.data.properties.depth, Validators.required],
            unitHeight: [this.data.properties.height, Validators.required],
            glazingFactor: [this.data.properties.glazingFactor, Validators.required],
            woningenPerUnit: [this.data.properties.woningenPerUnit, Validators.required],
            productieKostenPerUnit: [this.data.properties.productieKostenPerUnit, Validators.required],
            openbaar: [!this.data.properties.isPrivate, Validators.required],
        });

        this.form.patchValue(data.properties);
    }


    ngOnInit(): void {
        const canvas = document.getElementById("viewerCanvas");
        if(!canvas){
            throw new Error("No canvas to attach viewer to.");
        }

        this.viewer.initToCanvas(canvas);
        
        this.init();
    }


    init(): void {
        this.geometryLoader.getOrDownloadSync(this.data.properties.id, (geom: THREE.Group) => {
            this.viewer.removeUserElements();
            this.viewer.addModel(geom);
        })
    }

    animate(renderer: EffectComposer) {
        renderer.render();

        requestAnimationFrame(() => this.animate(renderer));
    }

    update() {
        var properties : UpdateBouwconceptRequest = {
            id : this.data.properties.id,
            catalogId : this.data.catalog.id,
            name : this.form.get('name')?.value as string,
            bvoPerUnit: this.form.get('bvoPerUnit')?.value as number,
            glazingFactor: this.form.get('glazingFactor')?.value as number,
            m3PerUnit: this.form.get('m3PerUnit')?.value as number,
            woningenPerUnit: this.form.get('woningenPerUnit')?.value as number,
            productieKostenPerUnit: this.form.get('productieKostenPerUnit')?.value as number,
            isPrivate: !(this.form.get('openbaar')?.value as boolean),
            width: this.form.get('unitWidth')!.value as number,
            depth: this.form.get('unitDepth')!.value as number,
            height: this.form.get('unitHeight')!.value as number
        }

        this.conceptService.update(properties).subscribe({
            next: () => { this.close() }, 
            error: (err) => {window.alert(err.error.message)}
        });
    }

    assignGeometry(files : FileList | null){
        if(!files){
            return;
        }
        
        var _file : File = files[0];
        this.validation.validate(_file, 
            (model) => {
                var box = new THREE.Box3().setFromObject(model);
                var modelWidth = box.max.x - box.min.x;
                var modelDepth = box.max.z - box.min.z;
                var modelHeight = box.max.y - box.min.y;
                this.conceptService.assignGeometry(_file, this.data.properties.id, modelWidth, modelDepth, modelHeight).subscribe({
                    next: () => {
                        this.init();
                        this.form.controls["unitWidth"].setValue(modelWidth);
                        this.form.controls["unitDepth"].setValue(modelDepth);
                        this.form.controls["unitHeight"].setValue(modelHeight);
                    }, 
                    error: () => { }
                });
            }, 
            (m : string) => {
                window.alert("Uw geometrie is geen geldig glb- of gltf bestand. Reden: " + m);
            })
    }

    async setFromGeometry(){
        var model = await this.geometryLoader.getOrDownload(this.data.properties.id);
        var box = new THREE.Box3().setFromObject(model);
        var modelWidth = box.max.x - box.min.x;
        var modelDepth = box.max.z - box.min.z;
        var modelHeight = box.max.y - box.min.y;
        this.form.controls["unitWidth"].setValue(modelWidth);
        this.form.controls["unitDepth"].setValue(modelDepth);
        this.form.controls["unitHeight"].setValue(modelHeight);
    }

    close() {
        this.dialogRef.close();
    }
}