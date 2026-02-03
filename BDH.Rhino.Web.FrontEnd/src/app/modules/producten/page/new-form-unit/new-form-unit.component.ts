import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewBouwconceptRequest } from '@app/data/schema/requests/NewBouwconceptRequest';
import { BouwconceptService } from '@app/data/service/bouwconcept.service';
import { CatalogService } from '@app/data/service/catalog.service';
import { GlbValidatorService } from '@app/shared/service/glb-validator.service';
import { Box3 } from 'three';

@Component({
    selector: 'app-new-form-unit',
    templateUrl: './new-form-unit.component.html',
    styleUrls: ['./new-form-unit.component.scss']
})
export class NewFormUnitComponent {

    form: FormGroup;
    fileName : string | undefined;
    catalogs$;
    modelWidth : number | undefined;
    modelDepth : number | undefined;
    modelHeight : number | undefined;

    constructor(
        private dialogRef: MatDialogRef<NewFormUnitComponent>,
        @Inject(MAT_DIALOG_DATA) data : { catalog : string },
        private conceptService: BouwconceptService,
        formBuilder: FormBuilder,
        private validation: GlbValidatorService,
        catalogService : CatalogService
    ) {
        this.catalogs$ = catalogService.getForClientCompany();
        this.form = formBuilder.group({
            name: ["Uw Bouwconcept", Validators.required],
            catalog: [data.catalog, Validators.required],
            bvoPerUnit: [300, Validators.required],
            m3PerUnit: [1000, Validators.required],
            glazingFactor: [0.1, Validators.required],
            woningenPerUnit: [1, Validators.required],
            productieKostenPerUnit: [80_000, Validators.required],
            openbaar: [false],
            file : [[]]
        });
    }

    assignGeometry(files : FileList | null){
        if(!files){
            return;
        }

        var file = files[0];
        this.validation.validate(file, 
            (model) => {
                this.form.get('file')?.setValue(file);
                this.fileName = file.name;
                var box = new Box3().setFromObject(model);
                this.modelWidth = box.max.x - box.min.x;
                this.modelDepth = box.max.z - box.min.z;
                this.modelHeight = box.max.y - box.min.y;
            },
            (m : string) => {
                window.alert("Uw geometrie is geen geldig glb- of gltf bestand. Reden: " + m);
            })
    }

    submit(){
        var file = this.form.get('file')?.value;
        if(!file || file.length == 0 || !this.modelWidth || !this.modelDepth || !this.modelHeight){
            window.alert("Lever eerst een geldig .glb bestand.");
            return;
        }

        var properties : NewBouwconceptRequest = {
            name : this.form.get('name')?.value as string,
            catalogId: this.form.get('catalog')?.value as string,
            bvoPerUnit: this.form.get('bvoPerUnit')?.value as number,
            m3PerUnit: this.form.get('m3PerUnit')?.value as number,
            woningenPerUnit: this.form.get('woningenPerUnit')?.value as number,
            glazingFactor: this.form.get('glazingFactor')?.value as number,
            productieKostenPerUnit: this.form.get('productieKostenPerUnit')?.value as number,
            isPrivate: !(this.form.get('openbaar')?.value as boolean),
            width: this.modelWidth,
            height: this.modelHeight,
            depth: this.modelDepth
        }
        
        this.conceptService.new(properties, file).subscribe({
            next : () => {
                this.dialogRef.close();
            },
            error : (err) => {
                window.alert("Kon het bouwconcept niet uploaden : " + err.message);
            }
        });
    }
}
