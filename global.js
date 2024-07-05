if (globalThis.ErrorEvent === undefined) {
  globalThis.ErrorEvent = require("./error_event.js");
}
if (globalThis.Worker === undefined) {
  globalThis.Worker = require("./worker.js");
}
if (globalThis.self === undefined) {
  require("./self.js");
}
