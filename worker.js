const { Worker: _Worker } = require("node:worker_threads");

const ErrorEvent = require("./error_event.js");

class Worker extends EventTarget {
  #worker;

  constructor(specifier, options = {}) {
    super();

    this.onerror = null;
    this.onmessage = null;
    this.onmessageerror = null;
    this.#worker = new _Worker(specifier, options);
    this.#worker.on("error", (event) => this.#onWorkerError(event));
    this.#worker.on("message", (event) => this.#onWorkerMessage(event));
    this.#worker.on("messageerror", (event) => this.#onWorkerMessageError(event));
  }

  postMessage(message, transfer) {
    return this.#worker.postMessage(message, transfer);
  }

  terminate() {
    return this.#worker.terminate();
  }

  #onWorkerError(error) {
    const event = new ErrorEvent("error", { error });
    this.onerror?.(event);
    this.dispatchEvent(event);
  }

  #onWorkerMessage(data) {
    const event = new MessageEvent("message", { data });
    this.onmessage?.(event);
    this.dispatchEvent(event);
  }

  #onWorkerMessageError(data) {
    const event = new MessageEvent("messageerror", { data });
    this.onmessageerror?.(event);
    this.dispatchEvent(event);
  }
}

module.exports = Worker;
