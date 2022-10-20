# Web Workers Polyfill for Node.js

[![](https://img.shields.io/npm/v/@apacheli/web-workers.svg)](https://www.npmjs.com/package/@apacheli/web-workers)

### About

A simple Web Workers polyfill for the Node.js environment. Please 👍
[this issue](https://github.com/nodejs/node/issues/43583) so Web Workers can be
supported natively!

### Installing

```
npm i @apacheli/web-workers
```

### Getting Started

`main.js`

```js
const Worker = globalThis.Worker ?? require("@apacheli/web-workers").WebWorker;

const worker = new Worker("./worker.js");

worker.addEventListener("message", (event) => {
  console.log("[main] got a message:", event.data);
});

worker.postMessage("send message to worker");
```

`worker.js`

```js
if (globalThis.self === void 0) {
  require("@apacheli/web-workers/self.js");
}

self.postMessage("Hello, World!");

self.addEventListener("message", (event) => {
  console.log("[worker] got a message from main:", event.data);
});
```

[MDN Web Docs: Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
