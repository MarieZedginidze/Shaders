import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/Addons.js";

let fov;
let aspect;
let near;
let far;

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // Camera Setup variables
    fov = 35;
    aspect = this.sizes.width / this.sizes.height;
    near = 0.1;
    far = 100;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    (this.controls = new OrbitControls(this.instance, this.canvas)),
      (this.controls.enableDamping = true);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
