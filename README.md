# Web Workers Polyfill for Node.js

[![](https://img.shields.io/npm/v/@apacheli/web-workers.svg)](https://www.npmjs.com/package/@apacheli/web-workers)

### About

A polyfill for Web Workers for Node.js. Please 👍
[this issue](https://github.com/nodejs/node/issues/43583) so Web Workers can be
supported natively.

### Installing

```
npm i @apacheli/web-workers
```

### Getting Started

`main.js`

```js
require("@apacheli/web-workers");

const worker = new Worker("./test.js");

worker.addEventListener("message", (event) => {
  console.log("message from test:", event.data);
  worker.terminate();
});

worker.postMessage("Hello, World!");
```

`test.js`

```js
require("@apacheli/web-workers");

self.addEventListener("message", (event) => {
  console.log("message from main:", event.data);
});

self.postMessage("hi");
```

[MDN Web Docs: Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
