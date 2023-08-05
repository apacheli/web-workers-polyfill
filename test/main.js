require("../main.js");

const worker = new Worker("./test/test.js");

worker.addEventListener("message", (event) => {
  console.log("message from test:", event.data);
  worker.terminate();
});

worker.postMessage("Hello, World!");
