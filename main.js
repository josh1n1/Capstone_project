//LIBRARIES--------------------/
import { getScene } from './src/Scene.js';
import { getLight } from './src/Lights.js';
import { getAnimation } from './src/Logic/getAnimation.js';
import { getHandlers } from './src/Logic/getHandlers.js';


//BOILERPLATE------------------/
const { scene, camera, renderer, controls } = getScene();

//LIGHT OBJECTS----------------/
getLight(scene);

//ANIMATION LOOP---------------/
const { toSwitch } = getAnimation( scene, camera, renderer, controls );

//EVENT HANDLERS---------------/
getHandlers( scene, camera, renderer, controls, toSwitch );
