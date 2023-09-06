let worker;
let running = false;
let button = document.getElementById("toggle-inference");
let stopTimeout = null;

button.addEventListener("click", () => {
  const output = document.getElementById("output");

  if (!running) {
    output.textContent = "";

    worker = new Worker("/worker.js", { type: "module" });
    worker.postMessage({});
    worker.addEventListener('message', function (event) {
      if (stopTimeout != null) {
        clearTimeout(stopTimeout);
      }

      const { data } = event.data;
      output.textContent = `${output.textContent}${data}`;

      stopTimeout = setTimeout(() => {
        running = false;
        button.textContent = "Run inference";
      }, 500);
    });

    worker.addEventListener("error", function (error) {
      console.log("ERROR: ", error);
    });

    button.textContent = "Stop inference";
    running = true;
  } else {
    if (worker != null) {
      worker.terminate();
      worker = null;
    }

    button.textContent = "Run inference";
    running = false;
  }

});
