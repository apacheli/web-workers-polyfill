# Web Workers Polyfill for Node.js

A polyfill for Web Workers for Node.js.

- Adds `ErrorEvent`
- Adds `Worker`
- Adds `globalThis.self`

> [!NOTE]\
> Web Workers are currently not supported natively in **Node.js v25.2.1** and
> below. Please 👍 [this issue](https://github.com/nodejs/node/issues/43583) to
> show your support!

## Installing

Using npm:

```sh
$ npm i @apacheli/web-workers
```

Using Deno:

```sh
$ deno add npm:@apacheli/web-workers
```

Using Bun:

```sh
$ bun install @apacheli/web-workers
```

## Useful Links

- [Node.js ESM Modules](https://nodejs.org/api/esm.html)
- [Node.js `worker_threads`](https://nodejs.org/api/worker_threads.html)
- [Web Workers Documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Examples

### Using CommonJS

While I recommend using ESM instead of CommonJS, the focus of this module is to
add Web Workers support to Node.js.

Here is a simple example:

`main.js`

```js
const { Worker } = require("@apacheli/web-workers");

const worker = new Worker("./worker.js");

worker.addEventListener("message", (event) => {
  console.log("message from worker.js:", event.data);
  worker.terminate();
});

worker.postMessage("Hello, World!");
```

`worker.js`

```js
const { self } = require("@apacheli/web-workers");

self.addEventListener("message", (event) => {
  console.log("message from main:", event.data);
});

self.postMessage("hi");
```

Yields the following:

```
$ node main.js
message from worker.js: hi
message from main: Hello, World!
```

Regularly importing the module does not modify the global namespace. Instead,
you can import `@apacheli/web-workers/global` script to modify the global
namespace:

`main.js`

```js
require("@apacheli/web-workers/global");

const worker = new Worker("./worker.js");

worker.addEventListener("message", (event) => {
  console.log("message from worker.js:", event.data);
  worker.terminate();
});

worker.postMessage("Hello, World!");
```

`worker.js`

```js
require("@apacheli/web-workers/global");

self.addEventListener("message", (event) => {
  console.log("message from main:", event.data);
});

self.postMessage("hi");
```

## Using ESM

> [!NOTE]\
> You may have to append `.js` to the import.

`main.js`

```js
import "@apacheli/web-workers/global.js";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

worker.addEventListener("message", (event) => {
  console.log("message from worker:", event.data);
  worker.terminate();
});

worker.postMessage("Hello, World!");
```

`worker.js`

```js
import "@apacheli/web-workers/global.js";

self.addEventListener("message", (event) => {
  console.log("message from main:", event.data);
});

self.postMessage("hi");
```

For maximum cross-platform compatibility, you should use `URL` to specify your
worker. `new Worker("./worker.js")` will still work in Node.js though.

If you use platforms such as Deno and Bun, the global namespace will not be
tampered. It will just reexport the already existing implementations.

```js
import { Worker } from "@apacheli/web-workers";
// ^ Reexports `Worker` if it already exists

console.log(Worker === globalThis.Worker);
// => Node: false - because globalThis.Worker does not exist
// => Deno: true
// => Bun: true
```

```js
import "@apacheli/web-workers/global.js";
// ^ Does nothing in Deno and Bun

console.log(Worker === globalThis.Worker);
// => Node: true
// => Deno: true
// => Bun: true
```

```js
console.log(Worker === globalThis.Worker);
// => Node: Uncaught ReferenceError: Worker is not defined
// => Deno: true
// => Bun: true
```

## Browser

In the event you need this package for the browser for some reason, imports from
`esm.sh` are available.

```html
<script
  src="https://esm.sh/@apacheli/web-workers/global.js"
  type="module"
></script>
```

## Bugs

If you encounter any bugs, feel free to open an issue.

https://github.com/apacheli/web-workers-polyfill/issues

## License

[MIT License](LICENSE.txt)
