const { parentPort, workerData } = require("node:worker_threads");

const target = new EventTarget();

globalThis.self = globalThis;

self.name = workerData.name;

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

self.addEventListener = (type, listener) => {
  target.addEventListener(type, listener);
};

self.removeEventListener = (type, listener) => {
  target.removeEventListener(type, listener);
};

self.dispatchEvent = (event) => {
  return target.dispatchEvent(event);
};

self.close = () => {
  parentPort.close();
};

self.postMessage = (message, transfer) => {
  parentPort.postMessage(message, transfer);
};
