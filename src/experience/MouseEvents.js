import * as THREE from "three";
import EventEmitter from "./utils/EventEmitter.js";

// Instantiate mouse
let mouseDownCoords = new THREE.Vector2();
let mouseUpCoords = new THREE.Vector2();

export default class MouseMove extends EventEmitter {
  constructor() {
    super();
    //setup
    this.mousedownCoords = mouseDownCoords;
    this.mouseupCoords = mouseUpCoords;

    window.addEventListener("mousedown", (event) => {
      // calculate Pointer Position in Normalized Device Coordinates (-1 to +1) for Both Components
      this.mousedownCoords.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousedownCoords.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("mouseup", (event) => {
      this.mouseupCoords.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseupCoords.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // If mouse down coordinates are different from mouse up coordinates, that means click happened
      // and trigger the click event
      if (
        this.mousedownCoords.x === this.mouseupCoords.x &&
        this.mousedownCoords.y === this.mouseupCoords.y
      ) {
        this.trigger("click");
      }
    });
  }
}
