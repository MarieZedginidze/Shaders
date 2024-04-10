import * as THREE from "three";
import Experience from "../Experience.js";
import testVertexShader from "../../shaders/PlasmaEnergy/vertex.glsl";
import testFragmentShader from "../../shaders/PlasmaEnergy/fragment.glsl";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Geometry
    const geometry = new THREE.BoxGeometry(3, 3, 3);

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      side: THREE.DoubleSide,
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }
}
