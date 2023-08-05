const NodeWorker = require("node:worker_threads").Worker;
const { ErrorEvent } = require("./error_event.js");

class Worker extends EventTarget {
  onerror = null;
  onmessage = null;
  onmessageerror = null;

  #worker;

  constructor(specifier, options) {
    super();

    this.#worker = new NodeWorker(specifier, {
      workerData: { name: options?.name },
    });
    this.#worker.on("error", (error) => {
      const event = new ErrorEvent("error", { error });
      this.onerror?.(event);
      this.dispatchEvent(event);
    });
    this.#worker.on("message", (data) => {
      const event = new MessageEvent("message", { data });
      this.onmessage?.(event);
      this.dispatchEvent(event);
    });
    this.#worker.on("messageerror", (data) => {
      const event = new MessageEvent("messageerror", { data });
      this.onmessageerror?.(event);
      this.dispatchEvent(event);
    });
  }

  postMessage(message, transfer) {
    this.#worker.postMessage(message, transfer);
  }

  terminate() {
    this.#worker.terminate();
  }
}

globalThis.Worker = Worker;

// 1.0.1
exports.WebWorker = Worker;
