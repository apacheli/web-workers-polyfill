const { isMainThread } = require("node:worker_threads");

if (!globalThis.Worker) {
  require("./worker.js");
}
if (!isMainThread && !globalThis.self) {
  require("./self.js");
}
