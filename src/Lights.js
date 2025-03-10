import * as THREE from 'three';

export function getLight(scene) {
    // Ambient Light (soft overall light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity
    scene.add(ambientLight);

    // Directional Light (simulates sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
    directionalLight.position.set(5, 5, 5); // Position the light
    scene.add(directionalLight);

    // Hemisphere Light (for natural outdoor lighting)
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5); // Sky color, Ground color, Intensity
    scene.add(hemisphereLight);

    // Point Light (for localized light sources)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Color, Intensity, Distance
    pointLight.position.set(10, 10, 10); // Position the light
    scene.add(pointLight);
}