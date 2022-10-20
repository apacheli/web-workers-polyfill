const { Worker } = require("node:worker_threads");

class WebWorker extends EventTarget {
  onerror = null;
  onmessage = null;
  onmessageerror = null;

  #worker;

  constructor(specifier, options = {}) {
    super();

    this.#worker = new Worker(specifier, {
      workerData: {
        name: options.name,
      },
    });
    this.#worker.on("error", () => {
      const event = new Event("error");
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

exports.WebWorker = WebWorker;
