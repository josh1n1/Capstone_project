import * as THREE from 'three';
//Libraries--------------------/
import { getSun } from './getSun.js';
import { getPlanet, getMoon, getRing } from './getPlanet';


export function getSystem() {
    const group = new THREE.Group();

//SYSTEM OBJECTS---------------/
// Sun-------------------------/
    const sun = getSun();
    group.add(sun);

// Planets----------------------/
    const mercury = getPlanet({ size:0.05, img:'mercurytex.jpg', distance:2, color:0xD7D7D7, rotation:0.02 });
    mercury.orbit = 0.02;
    group.add(mercury);

    const venus = getPlanet({ size:0.1, img:'venustex.jpg', distance:3, color:0xFC9417, rotation:0.015 });
    venus.orbit = 0.015;
    group.add(venus);

    const earth = getPlanet({ size:0.12, img:'earthtex.jpg', distance:4, color:0x00DDD8, rotation:0.01 });
    earth.orbit = 0.01;
    group.add(earth);

    const mars = getPlanet({ size:0.08, img:'marstex.jpg', distance:5, color:0xFF4A4A, rotation:0.008 });
    mars.orbit = 0.008;
    group.add(mars);

    const jupiter = getPlanet({ size:0.3, img:'jupitertex.jpg', distance:7, color:0xFFB54A, rotation:0.005 });
    jupiter.orbit = 0.0045;
    group.add(jupiter);

    const saturn = getPlanet({ size:0.25, img:'saturntex.jpg', distance:9, color:0xFFCA7E, rotation:0.004 });
    saturn.orbit = 0.004;
    group.add(saturn);

    const uranus = getPlanet({ size:0.2, img:'uranustex.jpg', distance:11, color:0xA3FFEE, rotation:0.003 });
    uranus.orbit = 0.003;
    group.add(uranus);

    const neptune = getPlanet({ size:0.2, img:'neptunetex.jpg', distance:13, color:0x00B6FF, rotation:0.002 });
    neptune.orbit = 0.002;
    group.add(neptune);

//Moon--------------------------/
const moon = getMoon();
earth.add(moon);

//RING--------------------------/
const saturnRing = getRing({ radius:0.5, tube:0.1, img:'saturnring.jpg' });
saturnRing.rotation.x = Math.PI / 4;
saturn.add(saturnRing);

const uranusRing = getRing({ radius:0.3, tube:0.05, img:'uranusring.jpg' });
uranus.add(uranusRing);

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