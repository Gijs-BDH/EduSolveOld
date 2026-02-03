import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
    providedIn: 'root'
})
export class SimpleModelViewerService {


    private scene : THREE.Scene;
    private camera : THREE.PerspectiveCamera | undefined;
    private renderer : THREE.WebGLRenderer | undefined;
    private canvas : HTMLElement | undefined;

    constructor() { 
        this.scene = new THREE.Scene();
    }


    initToCanvas(canvas: HTMLElement) {
        this.canvas = canvas;
        this.scene.clear();
        this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvas!.appendChild(this.renderer.domElement);

        this.camera.position.set(-50, 50, 50)
        this.camera.lookAt(0, 0, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(200, 500, 300);
        this.scene.add(directionalLight);

        var controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        };
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };
      

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
        ]);
        this.scene.background = texture;

        this.animate(this.renderer);

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    }


    animate(renderer: THREE.Renderer) {
        if(!this.camera){
            return;
        }

        renderer.render(this.scene, this.camera);

        requestAnimationFrame(() => this.animate(renderer));
    }


    removeUserElements(){
        var elements : THREE.Object3D[] = [];
        this.scene.traverse(m => {
            if(m.name == 'userModel'){
                elements.push(m);
            }
        })

        for(var i = 0; i<elements.length; i++){
            this.scene.remove(elements[i]);
        }
    }

    addModel(model : THREE.Object3D){
        model.name = 'userModel';
        this.scene.add(model);
    }

    onWindowResize() {
        if(!this.camera || !this.renderer || !this.canvas){
            return;
        }

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
    
        this.camera.aspect = width / height;
        this.renderer.setSize( width, height );
    
        this.camera.updateProjectionMatrix();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        
    }
}
