import { gsap } from "gsap";
import Experience from "./Experience.js";
import Raycaster from "./Raycaster.js";

export default class MeshFocus {
  constructor() {
    // Setup
    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;
    this.raycaster = new Raycaster();

    // Listen to the castRay event from Raycaster Class
    this.raycaster.on("castRay", () => {
      this.intersected = this.raycaster.intersected;
      this.focusCamera();
    });
  }
  // Move the camera and orbit controls to the mesh position
  focusCamera() {
    gsap.to(this.camera.position, {
      duration: 0.5,
      x: this.intersected.position.x,
      y: this.intersected.position.y,
      z: this.intersected.position.z + 6,
      ease: "circ.out",
    });
    gsap.to(this.controls.target, {
      duration: 0.3,
      x: this.intersected.position.x,
      y: this.intersected.position.y,
      z: this.intersected.position.z,
      ease: "circ.out",
    });
  }
}
