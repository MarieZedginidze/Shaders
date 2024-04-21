import Experience from "./Experience";
import Raycaster from "./Raycaster";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export default class MeshControls {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;
    this.raycaster = new Raycaster();
    this.transformControls = new TransformControls(this.camera, this.canvas);

    // Listen to the castRay event from Raycaster Class
    this.raycaster.on("castRay", () => {
      this.intersected = this.raycaster.intersected;
      this.attachControls();
    });
    this.raycaster.on("orbitScene", () => {
      this.detachControls();
    });
  }
  attachControls() {
    this.transformControls.attach(this.intersected);
    this.scene.add(this.transformControls);
    this.transformControls.setMode("rotate");
    this.controls.enabled = false;
  }
  detachControls() {
    this.transformControls.detach();
    this.controls.enabled = true;
  }
}
