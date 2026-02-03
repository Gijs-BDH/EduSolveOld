import { Injectable } from '@angular/core';
import { GlbExporterService } from '@app/shared/service/glb-exporter.service';
import { ObjModelExporterService } from '@app/shared/service/obj-model-exporter.service';
import { UrbanSolveShellService } from './urban-solve-shell.service';
import * as THREE from 'three';
import { ColladaModelExporterService } from '@app/shared/service/collada-model-exporter.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectGeometryExporterService {

    constructor(
        private glb: GlbExporterService, 
        private obj: ObjModelExporterService, 
        private dae : ColladaModelExporterService,
        private shell: UrbanSolveShellService) {


    }

    private getModel(){
        var group = new THREE.Group();
        var buildingConcepts = this.shell.getBuildingConceptProxies();
        var massModels = this.shell.getMassModelProxies();

        for(var i = 0; i<buildingConcepts.length; i++){
            group.add(buildingConcepts[i].clone(true))
        }
        
        for(var i = 0; i<massModels.length; i++){
            group.add(massModels[i].clone(true))
        }

        return group;
    }

    public exportGlb(action: (model : ArrayBuffer) => void) {
       
        this.glb.export(this.getModel(), 
        action,
        (err) => {
            window.alert(err)
        })
    }

    public exportObj(){
        return this.obj.export(this.getModel());
    }

    public expotCollada(){
        return this.dae.export(this.getModel());
    }
}
