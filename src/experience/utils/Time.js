import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
