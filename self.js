module.exports = globalThis.self = globalThis;

const { parentPort } = require("node:worker_threads");

if (parentPort !== null) {
  const target = new EventTarget();

  self.onmessage = null;
  self.onmessageerror = null;

  parentPort.on("message", (data) => {
    const event = new MessageEvent("message", { data });
    self.onmessage?.(event);
    target.dispatchEvent(event);
  });
  parentPort.on("messageerror", (data) => {
    const event = new MessageEvent("message", { data });
    self.onmessageerror?.(event);
    target.dispatchEvent(event);
  });

  self.addEventListener = (type, listener, options) => target.addEventListener(type, listener, options);
  self.removeEventListener = (type, listener, options) => target.removeEventListener(type, listener, options);
  self.dispatchEvent = (event) => target.dispatchEvent(event);
  self.close = () => parentPort.close();
  self.postMessage = (message, transfer) => parentPort.postMessage(message, transfer);
}
