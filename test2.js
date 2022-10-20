if (globalThis.self === void 0) {
  require("./self.js");
}

self.postMessage("Hello, World!");

self.addEventListener("message", (event) => {
  console.log("[worker] got a message from main:", event.data);
});
