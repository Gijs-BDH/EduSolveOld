import { BaseViewer } from "./baseViewer";
import { BatchSelection } from "./BatchSelection";
import * as THREE from 'three';
import { MapLayer } from "./mapLayer";
import { MapLayers } from "./MapLayers";

export class ExtendedBagViewer extends BaseViewer{
    maxSelected: number;
    hideHidden: number;
    batchSelection: BatchSelection;
    batchHidden: BatchSelection;
    meshColor: any;

    public get isTemporaryRevealHidden() {
        return this.hideHidden < 0.5;
    }
    
    constructor(){
        super();

        this.maxSelected = 100;
        this.hideHidden = 1.0;

        this.batchSelection = new BatchSelection();
        this.batchHidden = new BatchSelection();
    }

    
    init(domElement : HTMLElement) : ExtendedBagViewer{
        super.initScene(domElement).reinitTiles(false).renderScene();
        
        return this;
    }
    
    constructShader( shader: any ) {
        const initSelectedIds = [];
        const initHiddenIds = [];

        for(var i = 0; i<this.maxSelected; i++){
            initHiddenIds.push(-1);
            initSelectedIds.push(-1);
        }

        const newShader = { ...shader };
        newShader.uniforms = {
            highlightedBatchIds: { value: initSelectedIds },
            hiddenBatchIds: { value: initHiddenIds },
            hideHidden: { value: [true] },
            highlightColor: { value: new THREE.Color( 0xFFC107 ).convertSRGBToLinear() },
            ...THREE.UniformsUtils.clone( shader.uniforms ),
        };
        newShader.extensions = {
            derivatives: true,
        };
        newShader.lights = true;
        newShader.fog = true;
        newShader.transparent = true;
        newShader.vertexShader =
            `
                attribute float _batchid;
                varying float batchid;
            ` +
            newShader.vertexShader.replace(
                /#include <uv_vertex>/,
                `
                #include <uv_vertex>
                batchid = _batchid;
                `
            );
        newShader.fragmentShader =
            `
                varying float batchid;
                uniform float[1] hideHidden;
                uniform float[` + this.maxSelected + `] highlightedBatchIds;
                uniform float[` + this.maxSelected + `] hiddenBatchIds;
                uniform vec3 highlightColor;
            ` +
            newShader.fragmentShader.replace(
                /vec4 diffuseColor = vec4\( diffuse, opacity \);/,
                `
                bool selected = false;
                for(int i = 0; i<` + this.maxSelected + `; i++){
                    float highlightedBatchId = highlightedBatchIds[i];
                    if(abs( batchid - highlightedBatchId ) < 0.5){
                        selected = true;
                    }
                }

                float _opacity = opacity;

                bool hidden = false;

                for(int i = 0; i<` + this.maxSelected + `; i++){
                    float id = hiddenBatchIds[i];
                    if(abs( batchid - id ) < 0.5){
                        hidden = true;
                    }
                }
                
                if(hidden){
                    if(hideHidden[0] > 0.5){
                        _opacity = 0.0;
                    } else{
                        _opacity = 0.3;
                    }
                }

                vec4 diffuseColor =
                    selected ?
                    vec4( highlightColor, _opacity ) :
                    vec4( diffuse, _opacity );
                `
            );
    
        return newShader;
    
    }

    addToSelection(object: THREE.Mesh, batchId: string){
        this.batchSelection.addId(object, batchId);
        this.paintObjectsBySelection();
    }

    setSingleSelected(object: THREE.Mesh, batchId: string){
        this.batchSelection.setSingle(object, batchId);
        this.paintObjectsBySelection();
    }

    clearSelection(){
        this.batchSelection.clear();
        this.paintObjectsBySelection();
    }

    paintObjectsBySelection(){
        this.batchSelection.selectedIds.forEach((o: any) =>{
            o.tile.material = this.duplicateBaseMaterial();
            o.tile.material.uniforms.highlightedBatchIds.value = this.padUntilLength(o.ids, -1, this.maxSelected);

            var hiddenIds = this.batchHidden.find(o.tile);
            o.tile.material.uniforms.hiddenBatchIds.value = this.padUntilLength(hiddenIds, -1, this.maxSelected);
            
            o.tile.material.uniforms.hideHidden.value = [this.hideHidden];
        })
        
        this.needsRerender = 1;
    }

    padUntilLength(arr : any [], pad : any, length: number){
        var copy = arr.map(i => i);
        for(var i = copy.length; i<length; i++){
            copy.push(pad);
        }

        return copy;
    }

    createEmptyArray(lenght: number, value : any){
        var arr = [];
        for(var i= 0; i<lenght; i++){
            arr.push(value);
        }
        return arr;
    }

    duplicateBaseMaterial(){
        var material: any = new THREE.ShaderMaterial( this.constructShader( THREE.ShaderLib.lambert ) );
        material.uniforms.diffuse.value = new THREE.Color( this.meshColor ).convertSRGBToLinear();
        return material;
    }

    hideSelected(){
        this.batchSelection.mergeInto(this.batchHidden);
        this.batchSelection.clear();
        this.paintObjectsBySelection();
    }

    unHideSelected(){
        this.batchSelection.subtractFrom(this.batchHidden);
        this.paintObjectsBySelection();
    }

    revealHiddenTemporary(){
        this.hideHidden = 0.0;
        this.batchSelection.clear();
        this.paintObjectsBySelection();
    }

    resetTemporaryReveal(){
        this.hideHidden = 1.0;
        this.batchSelection.clear();
        this.paintObjectsBySelection();
    }

    activeLayer() : MapLayer{
        return this.basemapOptions;
    }
    
    getCapabilities() : MapLayer[]{
        var layers : MapLayer[] = [];

        for (const p in new MapLayers()){
            layers.push(new MapLayers()[p]);
        }

        return layers;
    }

    setCapabitlies(layer : MapLayer) : void{
        this.basemapOptions = layer;

        this.reinitBasemap();

        this.needsRerender = 1;
    }

    positionCamera(x: number, y: number, z: number): void {

        this.orbitControls.target.set(x, 0, z);
        this.camera.position.set(x - 500, y, z + 500);
        this.camera.lookAt(this.orbitControls.target);
        
    }

    pointCameraNorth(): void {
        this.pointCameraToNorth();
    }

    reset(){
        this.scene.traverse((o : any) => {
            if(o.isMesh){
                this.scene.remove(o);
            }
        })

        this.reinitBasemap();

        this.reinitTiles(true);
    }
}

