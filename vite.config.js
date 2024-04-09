import { resolve } from 'path';
import glsl from "vite-plugin-glsl";

console.log(process.env.api);

let root;
switch(process.env.api) {
  case "1": root = "src/test/api/";
    break;
  case "2": root = "dist/";
    break;
  default: root = "src/test/"; 
}

export default {
  root: root,
  publicDir: "../static/",
  base: "./",
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: process.env.api ? "../../../dist" : "../../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
  },
  plugins: [glsl()],
};
