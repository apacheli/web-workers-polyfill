const Worker = globalThis.Worker ?? require("./worker.js").WebWorker;

const worker = new Worker("./test2.js");

worker.addEventListener("message", (event) => {
  console.log("[main] got a message:", event.data);
});

worker.postMessage("send message to worker");
