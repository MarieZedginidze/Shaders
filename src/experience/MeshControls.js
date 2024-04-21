import Experience from "./Experience";
import Raycaster from "./Raycaster";

export default class TransformControls {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.raycaster = new Raycaster();
    this.transformControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );

    // Listen to the castRay event from Raycaster Class
    this.raycaster.on("castRay", () => {
      this.intersected = this.raycaster.intersected;
      this.attachControls();
    });
  }
  attachControls() {
    this.transformControls.attach(this.intersected);
  }
}
