import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { getGalaxy } from './Main/getGalaxy';
import { getSystem } from './Main/getSystem';

//SCENE SETUP------------------/
export function getScene() {
    //BOILERPLATE--------------/

    // Initialization----------/
    const canvas = document.querySelector( '#c' );
    const scene = new THREE.Scene();

    // Camera Properties-------/
    const fov = 30;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

    // Renderer----------------/
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize( window.innerWidth, window.innerHeight )

    // Controls----------------/
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controls.enablePan = false;
    
    // Axes--------------------/
    const axes = new THREE.AxesHelper( 10 );
    scene.add( axes );


    //MESH OBJECTS-------------/
    //Background Objects-------/
    const galaxy = getGalaxy();
    scene.add(galaxy);
    //Main Objects-------------/
    const system = getSystem();
    system.name = 'system'; 
    scene.add(system);

    //RESIZE HANDLER-----------/
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    return { scene, camera, renderer, controls };
}