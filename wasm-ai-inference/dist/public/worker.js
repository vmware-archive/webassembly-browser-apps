import { WASI, WASIContext } from "https://cdn.skypack.dev/@runno/wasi";

// Handle incoming messages
self.addEventListener('message', function (event) {
  const { eventType, eventData, eventId } = event.data;

  // Pulling the model
  Promise.all(
    [
      fetch("/model/stories260K.bin").then(res => res.arrayBuffer()),
      fetch("/model/tokenizer.bin").then(res => res.arrayBuffer())
    ],
  ).then(async data => {
    let model = data[0];
    let tokenizer = data[1];

    const context = new WASIContext({
      args: ["", "model.bin", "-t", "0.9"],
      stdout: (data) => self.postMessage({ data }),
      stderr: (err) => console.error("stderr", err),
      fs: {
        "/model.bin": {
          path: "/model.bin",
          timestamps: {
            access: new Date(),
            change: new Date(),
            modification: new Date(),
          },
          mode: "binary",
          content: new Uint8Array(model),
        },
        "/tokenizer.bin": {
          path: "/tokenizer.bin",
          timestamps: {
            access: new Date(),
            change: new Date(),
            modification: new Date(),
          },
          mode: "binary",
          content: new Uint8Array(tokenizer),
        },
      },
    });

    WASI.start(fetch("/llama2-c.wasm"), context);
  });

}, false);
