import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { plasmaEnergy } from "./plasma-energy.js";

//I need to figure out the right pattern here. This will work for now, 
// probably isn't how we actually want to do it.
let API = {};

let canvas;
let scene;
let renderer;
let camera;
// Any canvas with class="webgl" will work, but for multiple webgl elements, THREEjs suggests
// a single canvas the size of the window with multiple scenes. See
// https://threejs.org/manual/#en/multiple-scenes for why.
API.initializeCanvas = (webglCanvas) => {
    canvas = webglCanvas;
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
}
console.log('after initialize');

// Now that we're going with making custom html elements and defining them in the javascript,
// I feell like we want different methods to adding the shaders to the scene. This will likely
// go away. 

API.addShapeToCanvas = (geometry, vertexShader = vertexShader, fragmentShader = fragmentShader, side = THREE.DoubleSide) => {
    // TODO: define geometries that map to THREE geometries. 
    scene = new THREE.Scene();
    const THREEGeometry = new THREE.BoxGeometry(geometry.x, geometry.y, geometry.z);
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: side,
    });
    const mesh = new THREE.Mesh(THREEGeometry, material);
    scene.add(mesh);

    // TODO need to remove these magic numbers and replace with variable declared above
    camera = new THREE.PerspectiveCamera(
        75, // fov
        window.innerWidth / window.innerHeight, // aspect
        0.1, // near
        100 // far
    );
    camera.position.set(0.25, -0.25, 30);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enabled = false;

    return {
        mesh,
        camera,
        controls
    };
};

const resize = () => {
  if(!camera || !renderer) {
    return;
  }
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

resize();

window.addEventListener("resize", resize);

/**
 * Animate
 */
const tick = () => {
  // Update controls
  // TODO figure out controls for multiple objects
  //controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};


API.start = () => {
    tick();
};


window.API = API;


