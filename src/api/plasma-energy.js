import vertexShader from "../shaders/PlasmaEnergy/vertex.glsl?raw";
import fragmentShader from "../shaders/PlasmaEnergy/fragment.glsl?raw";

class PlasmaEnergy extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if(!window.API) {
      return setTimeout(this.connectedCallback, 1000);
    }
    const canvas = document.querySelector('canvas.webgl');
    window.API.initializeCanvas(canvas)
    window.API.addShapeToCanvas({x: 5, y: 10, z: 6}, vertexShader, fragmentShader);
    window.API.start();
  }

};

// custom elements must have a - in their name
customElements.define("plasma-energy", PlasmaEnergy);
