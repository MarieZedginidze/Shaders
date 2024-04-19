import * as THREE from "three";
import Experience from "../Experience.js";
import testVertexShader from "../../shaders/PlasmaEnergy/vertex.glsl";
import testFragmentShader from "../../shaders/PlasmaEnergy/fragment.glsl";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      side: THREE.DoubleSide,
    });

    // Cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);
    cube.position.set(0, 0, 3);

    // Torus knot
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
      material
    );
    torusKnot.position.set(3, 0, 0);

    // Torus geometry
    const torusGeometry = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.3, 16, 100),
      material
    );
    torusGeometry.position.set(-8, 0, -3);

    this.scene.add(cube);
    this.scene.add(torusKnot);
    this.scene.add(torusGeometry);
  }
}
