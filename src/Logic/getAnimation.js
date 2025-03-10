export function getAnimation( scene, camera, renderer, controls ) {
    let toSwitch = true;

    function animate() {
        requestAnimationFrame( animate );
        controls.update();

        if ( toSwitch ) {
            scene.getObjectByName('system').update();
        }

        renderer.render( scene, camera );

    } animate();
    return { toSwitch };
}