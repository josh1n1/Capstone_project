import * as THREE from 'three';
//Libraries--------------------/
import { getSun } from './getSun.js';
import { getPlanet, getMoon, getRing } from './getPlanet';
import { planetDetails } from '../Data/planetDetails.js';


export function getSystem() {
    const group = new THREE.Group();

    for(let planet of planetDetails){
 
        const {rotation, img} = planet
        
        const planetObj = getPlanet(planet);
        planetObj.orbit = rotation
        group.add(planetObj);

        if(img.includes("earth")){
            const moon = getMoon();
            planetObj.add(moon);
        }
        if(img.includes("saturn")){
            const saturnRing = getRing({ radius:0.5, tube:0.1, img:'saturn ring.png' });
            saturnRing.rotation.x = Math.PI / 4;
            planetObj.add(saturnRing);
        }
        if(img.includes("uranus")){
            const uranusRing = getRing({ radius:0.3, tube:0.05, img:'uranus ring.png' });
            planetObj.add(uranusRing)
        }
    }

//SYSTEM OBJECTS---------------/
// Sun-------------------------/
    const sun = getSun();
    group.add(sun);

    group.update = () => {
        group.rotation.y += 0.005; // Rotate the Entire Group

        // Update eachplanet's position to orbit the sun
        group.children.forEach(( planet ) => {
            if ( planet.orbit ) {
                planet.angle = (planet.angle || 0) + planet.orbit;
                planet.position.x = Math.cos(planet.angle) * planet.distance;
                planet.position.z = Math.sin(planet.angle) * planet.distance;
            }
        });
    }; return group;
}