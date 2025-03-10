import * as THREE from 'three';
import { getFresnelMat } from './getFresnelMat';

const texture = new THREE.TextureLoader();

//PLANET OBJECT---------------/
export function getPlanet ({ size=0.1, img='', distance=0, children=[], color='', rotation=0 }) {
  const geometry = new THREE.IcosahedronGeometry( size, 6 ); // Planet Geometry
  const map = texture.load(`../../../img/project_1/${img}`);
  const material = new THREE.MeshStandardMaterial({ map }); // Planet Material
  const planet = new THREE.Mesh( geometry, material ); // Planet Mesh (Geometry + Material)

   // Planets position = Distance Argument
   planet.position.x = distance;
   planet.distance = distance;
  
   // Moon and Rings as Arrays
   children.forEach(( child ) => {
    child.position.x = distance;
    center.add( child );
   });

   // The Planet Rays
   const rimMaterial = getFresnelMat({ rimHex: color,facingHex: 0x000000 });
   const rimMesh = new THREE.Mesh( geometry, rimMaterial );
   rimMesh.scale.setScalar(1.03);
   planet.add(rimMesh);

  planet.userData.update = (t) => {
    planet.rotation.y += rotation;
  };
   return planet;
}

//MOON OBJECT-----------------/
export function getMoon( ) {
  const geometry = new THREE.IcosahedronGeometry( 0.03, 6 );
  const map = texture.load( `../../../img/project_1/moontex.png` );
  const material = new THREE.MeshStandardMaterial({ map });

  const moon = new THREE.Mesh( geometry, material );
  moon.position.x = 0.5;

  moon.update = () => {
    moon.rotation.y = 0.02;
  }; return moon;
}

//RING OBJECT-----------------/
export function getRing({ radius=0.1, tube=0.1, img='' }) {
  const geometry = new THREE.TorusGeometry(radius, tube, 2, 64);
  const map = texture.load(`../../../img/project_1/${img}`);
  const material = new THREE.MeshStandardMaterial({ map });

  const ring = new THREE.Mesh( geometry, material );
  ring.rotation.x = Math.PI/ 2;
  return ring;
}