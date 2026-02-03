import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TilesRenderer } from '../3d-tiles-renderer/src/index';
import { WMSTilesRenderer, WMTSTilesRenderer } from '../terrain-tiles/index';
import * as TWEEN from '../tween/dist/tween.esm'

export class BaseViewer{
    constructor(){
        this.basemapOptions = {
            type: "wmts",
            options: {
                url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?',
                layer: 'standaard',
                style: 'default',
                tileMatrixSet: "EPSG:28992",
                service: "WMTS",
                request: "GetTile",
                version: "1.0.0",
                format: "image/png"
            }
        }

      //this.tilesUrl = 'https://3dbag.nl/download/3dtiles/v210908_fd2cee53/lod22/tileset.json';
        this.tilesUrl = 'https://data.3dbag.nl/v20250903/3dtiles/lod22/tileset.json';
        this.renderer = null;
        this.scene = null;
        this. offsetParent = null;
        this. camera = null;
        this. dummyCamera = null;
        this. orbitControls = null;
        this. material = null;
        this. highlightMaterial = null;
        
        this. raycaster = null;
        this. mouse = null;
        
        this. box = null;
        
        this. tiles = null;
        
        this. needsRerender = 0;
        this.renderBag = true;
        
        
        // debug
        this. lruCacheSize = 0;
        this. lruCacheMinSize = 85;
        this. lruCacheMaxSize = 115;
        
        this. pointIntensity = 0.4;
        this. directionalIntensity = 0.8;
        this. ambientIntensity = 0.5;
        
        this. dirX = 0.63;
        this. dirY = 1;
        this. dirZ = 0;
        
        this. meshShading = "normal";
        this. meshColor = "#c4c8cf";
        
        this. nearPlane = 2;
        this. farPlane = 300000;
        this. dummyFarPlane = 3500;
        
        this. maxDistShowTiles = 1750 * 1750;
        this. show3DTiles = true;
        
        this. fog = null;
        this. enableFog = false;
        this. fogDensity = 0.0004;
        this. fogColor = '#eeeeee';
        
        this. errorTarget = 0;
        this. errorThreshold = 60;
        
        this. castOnHover = false;
        this. overrideCast = false; // Defines if we should override the original TilesRenderer raycasting
        
        this. showTerrain = true;
        this. pane = null;
        
        this. selectedObject = null;
        
        this. sceneTransform = new THREE.Vector3(168720, 464970, 0);
        
        this. rayIntersect = null;
        
        this.pLight = null;
        this.dirLight = null;
        this.ambLight = null;
        this.hemLight= null;
        this.terrainTiles = null;
        this.markerName = null;
    }



    batchIdHighlightShaderMixin( shader ) {

        const newShader = { ...shader };
        newShader.uniforms = {
            highlightedBatchId: { value: - 1 },
            highlightColor: { value: new THREE.Color( 0xFFC107 ).convertSRGBToLinear() },
            ...THREE.UniformsUtils.clone( shader.uniforms ),
        };
        newShader.extensions = {
            derivatives: true,
        };
        newShader.lights = true;
        newShader.fog = true;
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
                uniform float highlightedBatchId;
                uniform vec3 highlightColor;
            ` +
            newShader.fragmentShader.replace(
                /vec4 diffuseColor = vec4\( diffuse, opacity \);/,
                `
                vec4 diffuseColor =
                    abs( batchid - highlightedBatchId ) < 0.5 ?
                    vec4( highlightColor, opacity ) :
                    vec4( diffuse, opacity );
                `
            );
        newShader.depthTest = true;
        newShader.transparent = true;
        newShader.blending = THREE.NormalBlending;
        return newShader;
    
    }
        
    
    initScene(canvas) {

        this.scene = new THREE.Scene();
        this.scene.background = null
        this.fog = new THREE.FogExp2( this.fogColor, this.fogDensity );
    
        this.material = new THREE.ShaderMaterial( this.batchIdHighlightShaderMixin( THREE.ShaderLib.lambert ) );
        this.material.transparent = true;
        this.material.depthWrite = true;
        this.material.uniforms.diffuse.value = new THREE.Color( this.meshColor ).convertSRGBToLinear();
    
        this.highlightMaterial = new THREE.ShaderMaterial( this.batchIdHighlightShaderMixin( THREE.ShaderLib.lambert ) );
        this.highlightMaterial.uniforms.diffuse.value = new THREE.Color( this.meshColor ).convertSRGBToLinear();
    
        this.box = new THREE.Box3();

        // enable AA only for non high DPI screens
        this.renderer = new THREE.WebGLRenderer( { antialias: window.devicePixelRatio > 1 ? false : true } );
        // renderer = new WebGLRenderer( { antialias: false } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( canvas.clientWidth, canvas.clientHeight );
        this.renderer.setClearColor( 0xffffff, 0 );
        this.renderer.autoClear = false;
    
        canvas.appendChild( this.renderer.domElement );
    
        this.camera = new THREE.PerspectiveCamera( 50, canvas.clientWidth / canvas.clientHeight, this.nearPlane, this.farPlane );
        this.camera.position.set( 0, 400, 0 );

        this.dummyCamera = new THREE.PerspectiveCamera( 30, canvas.clientWidth / canvas.clientHeight, this.nearPlane, this.dummyFarPlane );
    
        this.offsetParent = new THREE.Group();
        this.scene.add( this.offsetParent );

    
        //reinitTiles( true );
        this.show3DTiles = true;
    
        this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbitControls.screenSpacePanning = false;
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.15;
        this.orbitControls.minDistance = 20;
        this.orbitControls.maxDistance = 250000;
        this.orbitControls.maxPolarAngle = 0.8;
        this.orbitControls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        };
        this.orbitControls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };
        this.orbitControls.addEventListener( "change", () => this.needsRerender = 1 );
        // controls.addEventListener( "change", () => $emit( 'cam-rotation-z', camera.rotation.z ) );
        // controls.addEventListener( "end", setRouteFromCameraPos );
    

    
        // lights
        this.pLight = new THREE.PointLight( 0xffffff, this.pointIntensity, 0, 1 );
        this.camera.add( this.pLight );
        this.scene.add( this.camera );
    
        this.dirLight = new THREE.DirectionalLight( 0xffffff, this.directionalIntensity );
        this.dirLight.position.set( this.dirX, this.dirY, this.dirZ );
        this.scene.add( this.dirLight );
    
        this.ambLight = new THREE.AmbientLight( 0xffffff, this.ambientIntensity );
        this.scene.add( this.ambLight );
    
        var hemLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.3 );
        this.scene.add(hemLight);
    
        this.raycaster = new THREE.Raycaster();
        this.rayIntersect = new THREE.Group();
    
        const rayIntersectMat = new THREE.MeshBasicMaterial( { color: 0xe91e63 } );
        const rayMesh = new THREE.Mesh( new THREE.CylinderGeometry( 0.25, 0.25, 6 ), rayIntersectMat );
        rayMesh.rotation.x = Math.PI / 2;
        rayMesh.position.z += 3;
        this.rayIntersect.add( rayMesh );
    
        const rayRing = new THREE.Mesh( new THREE.TorusGeometry( 1.5, 0.2, 16, 100 ), rayIntersectMat );
        this.rayIntersect.add( rayRing );
        this.scene.add( this.rayIntersect );
        this.rayIntersect.visible = false;
    
        
        this.offsetParent.rotation.x = - Math.PI / 2;

        this.needsRerender = 1;
    
        window.addEventListener( 'resize', () => this.onWindowResize(canvas), false );

        return this;
    }


    reinitTiles( init ) {
    
        if ( this.tiles ) {
    
            this.offsetParent.remove( this.tiles.group );
    
        }
    
        this.tiles = new TilesRenderer( this.tilesUrl );
        this.tiles.displayBoxBounds = true;
        this.tiles.colorMode = 7;
        this.tiles.lruCache.minSize = this.lruCacheMinSize;
        this.tiles.lruCache.maxSize = this.lruCacheMaxSize;
    
        this.tiles.errorTarget = this.errorTarget;
        this.tiles.errorThreshold = this.errorThreshold;
        this.tiles.loadSiblings = false;
        this.tiles.maxDepth = 15;
        this.tiles.showEmptyTiles = true;
    
        this.tiles.downloadQueue.priorityCallback = tile => 1 / tile.cached.distance;
    
        this.tiles.setCamera( this.dummyCamera );
        this.tiles.setResolutionFromRenderer( this.dummyCamera, this.renderer );
    
        this.tiles.onLoadTileSet = () => {
    
            const transform = this.tiles.root.cached.transform;
            this.sceneTransform = new THREE.Vector3( transform.elements[ 12 ], transform.elements[ 13 ], transform.elements[ 14 ] );
    
            this.needsRerender = 2;
    
        };
    
        this.tiles.onLoadModel = ( s ) => {
    
            // const offset_z = tiles.root.cached.transform.elements[ 14 ];
            s.traverse( c => {
    
                if ( c.material ) {
    
                    c.material.dispose();
                    c.material = this.material;
    
                    if ( c.geometry ) {
    
                        c.geometry.computeBoundingBox();
                        // c.position.y = offset_z;
    
                    }
    
                }
    
            } );
    
            this.needsRerender = 1;
    
        };
    
        this.offsetParent.add( this.tiles.group );
    
        return this;
    }
    
    
    
    reinitBasemap() {
    
        if ( this.terrainTiles ) {
    
            this.offsetParent.remove( this.terrainTiles.group );
    
        }
    
        if ( this.basemapOptions.type == "wms" ) {
    
            this.terrainTiles = new WMSTilesRenderer(
                this.basemapOptions.options.url,
                this.basemapOptions.options.layer,
                this.basemapOptions.options.style
            );
    
            // terrainTiles.imageFormat = basemapOptions.imageFormat;
    
        } else if(this.basemapOptions.type == "wmts") {
    
            this.terrainTiles = new WMTSTilesRenderer( this.basemapOptions.options, () => this.needsRerender = 1 );
    
        } 
    
        this.offsetParent.add( this.terrainTiles.group );
    
        this.terrainTiles.onLoadTile = () => this.needsRerender = 1;
    
        return this;
    }
    

    
    
    

    getTileInformationFromActiveObject( object ) {

        // Find which tile this scene is associated with. This is slow and
        // intended for debug purposes only.
        let targetTile = null;
        const activeTiles = this.tiles.activeTiles;
        activeTiles.forEach( tile => {

            if ( targetTile ) {

                return true;

            }

            const scene = tile.cached.scene;
            if ( scene ) {

                scene.traverse( c => {

                    if ( c === object ) {

                        targetTile = tile;

                    }

                } );

            }

        } );

        if ( targetTile ) {

            return {

                distanceToCamera: targetTile.cached.distance,
                geometricError: targetTile.geometricError,
                screenSpaceError: targetTile.__error,
                depth: targetTile.__depth,
                isLeaf: targetTile.__isLeaf,
                id: targetTile.content.uri

            };

        } else {

            return null;

        }

    }


    pointCameraToNorth() {

        // Position camera to the south of the point it's focusing on
        const centre = new THREE.Vector2( this.orbitControls.target.x, this.orbitControls.target.z );
        const pos = new THREE.Vector2( this.camera.position.x, this.camera.position.z );
        const radius = centre.distanceTo( pos );
        const x = radius * Math.cos( Math.PI / 2 ) + centre.x;
        const z = radius * Math.sin( Math.PI / 2 ) + centre.y;

        const oldPos = { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z };
        const newPos = { x: x, y: this.camera.position.y, z: z };

        function animate( time ) {

            requestAnimationFrame( animate );
            TWEEN.update( time );

        }

        requestAnimationFrame( animate );

        new TWEEN.Tween( oldPos )
            .to( newPos, 500 )
            .easing( TWEEN.Easing.Quadratic.Out )
            .onUpdate( () => {

                this.camera.position.x = oldPos.x;
                this.camera.position.z = oldPos.z;
                this.camera.lookAt( this.orbitControls.target );

                this.needsRerender = 1;

            } )
            .start();

    }

    drawFrame(){

        if ( this.needsRerender > 0 ) {
    
            this.needsRerender --;
    
            this.orbitControls.update();
            this.camera.updateMatrixWorld();

            this.dummyCamera.matrixWorld.copy( this.camera.matrixWorld );
            this.dummyCamera.position.copy( this.camera.position );
            this.dummyCamera.quaternion.copy( this.camera.quaternion );
            this.dummyCamera.scale.copy( this.camera.scale );
            this.dummyCamera.far =this. dummyFarPlane;
            this.dummyCamera.updateMatrixWorld();
            
            const camdist = this.camera.position.distanceToSquared( this.orbitControls.target );

            if( this.renderBag ){

                // update tiles center
                if ( this.tiles.getBounds( this.box ) ) {
                    
                    this.box.getCenter( this.tiles.group.position );
                    this.tiles.group.position.multiplyScalar( - 1 );

                }

                this.lruCacheSize = this.tiles.lruCache.itemSet.size;


                if ( camdist < 1750 * 1750 ) {

                    this.tiles.update();

                    if ( ! this.show3DTiles ) {

                        this.offsetParent.add( this.tiles.group );
                        this.show3DTiles = true;

                    }

                } else {

                    if ( this.show3DTiles ) {

                        this.offsetParent.remove( this.tiles.group );
                        this. show3DTiles = false;

                    }

                }
            } else {
                
                if ( this.show3DTiles ) {

                    this.offsetParent.remove( this.tiles.group );
                    this. show3DTiles = false;

                }
            }
            
    
            if ( this.sceneTransform ) {
    
                if ( this.showTerrain ) {
    
                    this.terrainTiles.update( this.sceneTransform, this.camera );
    
                }
    
            }
    
            // offsetParent.remove( terrainTiles.group );
    
            // renderer.autoClear is set to false, so we need to clear manually. Because don't want to clear when second scene is rendered.
            this.renderer.clear();
            this.renderer.render( this.scene, this.camera );
    
            // offsetParent.add( terrainTiles.group );
    
        }

    }
    
    renderScene( ) {
    
        this.renderer.setAnimationLoop(null);
        this.renderer.resetState();
        this.renderer.setAnimationLoop(this.drawFrame.bind(this));

    }
    
    
    onWindowResize(canvas) {
        
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
    
        this.camera.aspect = width / height;
        this.renderer.setSize( width, height );
    
        this.camera.updateProjectionMatrix();
        this.renderer.setPixelRatio( window.devicePixelRatio );
    
        this.needsRerender = 1;
    
    }

}



