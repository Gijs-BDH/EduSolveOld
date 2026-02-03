import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: BuildingConcept, private geometryLoader : BuildingConceptGeometryLoaderService){
        
    }
    ngOnInit(): void {
        const canvas = document.getElementById("viewerCanvas");
        canvas!.innerHTML = '' ;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas!.clientWidth / canvas!.clientHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvas!.clientWidth, canvas!.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvas!.appendChild(renderer.domElement);

        camera.position.set(-50, 50, 50)
        camera.lookAt(0, 0, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(200, 500, 300);
        scene.add(directionalLight);

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        };
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };

        var composer = new EffectComposer(renderer);
        var saoPass = new SAOPass(scene, camera, true, true, new THREE.Vector2(2048, 2048));

        saoPass.params['output'] = SAOPass.OUTPUT.Default;
        saoPass.params['saoBias'] = 0;
        saoPass.params['saoIntensity'] = 1;
        saoPass.params['saoScale'] = 500;
        saoPass.params['saoKernelRadius'] = 50;
        saoPass.params['saoMinResolution'] = 0;
        saoPass.params['saoBlur'] = false;

        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(saoPass);

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
            '../../assets/imgs/skyboxbase.jpg',
        ]);
        scene.background = texture;
        this.geometryLoader.getOrDownloadSync(this.data.id, (geom: THREE.Group) => {
            scene.add(geom);
        })
        this.animate(composer);
    }

    animate(renderer: EffectComposer) {
        renderer.render();

        requestAnimationFrame(() => this.animate(renderer));
    }
}
