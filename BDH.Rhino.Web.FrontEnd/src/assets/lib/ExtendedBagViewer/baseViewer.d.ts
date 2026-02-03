import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MapLayer } from './mapLayer';
import { MapLayers } from "./MapLayers";

export class BaseViewer{
    mouse: THREE.Vector2
    renderer: THREE.WebGL1Renderer;
    raycaster: THREE.Raycaster;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    markerName: string;
    needsRerender: number;
    overrideCast: any;
    tiles: any;
    selectedObject: any;
    material: any;
    rayIntersect: any;
    terrainTiles: any;
    highlightMaterial: any;
    orbitControls: OrbitControls;
    basemapOptions : MapLayer;
    renderBag : boolean;
    
    constructor();


    initScene(canvas : HTMLElement): BaseViewer;
    reinitTiles(init: boolean): BaseViewer;
    reinitBasemap(): BaseViewer;
    castRay(clientX: number, clientY: number, snapTolerance: number):void; 
    getTileInformationFromActiveObject(object: any): {
        distanceToCamer: number,
        geometriesError: number,
        screenSpaceError: number,
        depth: number,
        isLeaf: boolean,
        id: string
    }
    pointCameraToNorth(): void;
    renderScene(): BaseViewer;
    onWindowResize() : void;
    onPointerMove(evt : any): void;
    onPointerDown(evt : any): void;
    onPointerUp(evt: any): void;

}