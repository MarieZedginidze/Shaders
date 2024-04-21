import * as THREE from "three";
import EventEmitter from "./utils/EventEmitter.js";
import Experience from "./Experience.js";
import MouseEvents from "./MouseEvents.js";

// Instantiate Raycaster
let raycaster = new THREE.Raycaster();
let intersected;

export default class Raycaster extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;

    this.mouseEvents = new MouseEvents();
    this.mousedownCoords = this.mouseEvents.mousedownCoords;

    this.raycaster = raycaster;
    this.intersected = intersected;

    // Cast a ray on click
    this.mouseEvents.on("click", () => {
      this.castRay();
    });
  }

  castRay() {
    this.raycaster.setFromCamera(this.mousedownCoords, this.camera);
    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      false
    );
    // If there is an intersection, get the first intersected element and trigger a raycast event
    if (intersects.length > 0) {
      this.intersected = intersects[0].object;
      this.trigger("castRay");
    } else {
      this.trigger("orbitScene");
    }
  }
}
