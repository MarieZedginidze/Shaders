import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import testVertexShader from "../shaders/PlasmaEnergy/vertex.glsl";
//import testFragmentShader from "../shaders/PlasmaEnergy/fragment.glsl";

// Canvas

/* getCanvasWithWebGLClass */
let canvas;
let scenes = [];
let renderer;
// Any canvas with class="webgl" will work, but for multiple webgl elements, THREEjs suggests
// a single canvas the size of the window with multiple scenes. See
// https://threejs.org/manual/#en/multiple-scenes for why.
const init = (webglCanvas) => {
    canvas = webglCanvas;
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });
}

export const addShapeToCanvas = (canvas, geometry, vertexShader, fragmentShader, side = THREE.DoubleSide) => {
    // TODO: define geometries that map to THREE geometries. 
    const scene = new THREE.Scene();
    const THREEGeometry = new THREE.BoxGeometry(geometry.x, geometry.y, geometry.z);
    const material = new THREE.ShaderMaterial({
        vertexShader: testVertexShader,
        fragmentShader: testFragmentShader,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.mesh(THREEGeometry, material);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(
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
}

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

  // Update camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

  // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

export const start = () => {
    tick();
}
/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};


