require("../main.js");

self.addEventListener("message", (event) => {
  console.log("message from main:", event.data);
});

self.postMessage("hi");
