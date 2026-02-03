import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import { environment } from '@env';
import { BuildingConceptGeometryDictionary } from '../models/BuildingConceptGeometryDictionary';

//provides an injectable service used to download and cache the 3d geometries of building concepts.
//the catch is that after downloading the geometry (either by promise or callback) the geometry is stored in memory so we can call getorthrow(id) and get the geometry without another trip to the api

@Injectable({
    providedIn: 'root'
})
export class BuildingConceptGeometryLoaderService {

    private baseUrl : string = environment.apiUrl + "/bouwconcepten/geometry/";

    public loadedGeometries : BuildingConceptGeometryDictionary<THREE.Group> = new BuildingConceptGeometryDictionary<THREE.Group>();

    constructor(private httpClient: HttpClient) { 

    }

    public async getOrDownload(id: string): Promise<THREE.Group> {
        var model: THREE.Group | undefined;

        try {
            model = this.loadedGeometries.get(id);
        }
        catch {
            model = await this.downloadGeometry(id);
            this.loadedGeometries.add(id, model);
        }

        if (!model) {
            throw new Error("Could not load model");
        }

        return model;
    }

    public getOrDownloadSync(id: string, callback: (geometry : THREE.Group) => void){
        var model: THREE.Group | undefined;

        try {
            model = this.loadedGeometries.get(id);
        }
        catch {
            
        }
        if(model){
            callback(model);
            return;
        }

        var options = { responseType: 'arraybuffer' as 'arraybuffer' };
        var url = this.baseUrl + id;

        this.httpClient.get(url, options)
            .subscribe({
                next: (res) => {
                    try{
                        new GLTFLoader().parse(res, '', 
                        (gltf) => {
                            var model = gltf.scene;
                            model.traverse((c:any) => {
                                if(c.material){
                                    c.material.metalness = 0;
                                    c.material.flatShading = true;
                                }
                            })

                            callback(model);
                        },
                        (error) => {
                            window.alert("Ongeldig .glb bestand!");
                        });
                    }
                    catch{
                        window.alert("Ongeldig .glb bestand!")
                    }
                },
                error: (err) => {
                    window.alert("Ongeldig .glb bestand!")
                }
            });

    }

    public getOrThrow(id: string): THREE.Group {
        return this.loadedGeometries.get(id);
    }



    private async downloadGeometry(id: string): Promise<THREE.Group> {

        return new Promise(async (resolve, reject) => {
            var url = this.baseUrl + id;

            var options = { responseType: 'arraybuffer' as 'arraybuffer' };
            var observable = this.httpClient.get(url, options);
            
            try{
                var firstData : ArrayBuffer = await firstValueFrom(observable);
                new GLTFLoader().parse(firstData, '', (gltf) => {
                    var model = gltf.scene;
                    model.traverse((c:any) => {
                        if(c.material){
                            c.material.metalness = 0;
                            c.material.flatShading = true;
                        }
                    })

                    resolve(model);
                },
                (error) => {
                    window.alert("Ongeldig .glb bestand!")
                    reject(error);
                });
            }
            catch{
                reject();
            }
        });

      
    }
}
