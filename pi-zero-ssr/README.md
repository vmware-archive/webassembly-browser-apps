# Modern Websites on a Raspberry Pi Zero W

This project is a PreactJS application running in the browser (client) and a server ([Server Side Rendering (SSR)](https://web.dev/rendering-on-the-web/)). The application includes common modern tooling:

* [Preact](https://preactjs.com/)
* [Vite](https://vitejs.dev/)
* [MDX](https://mdxjs.com/)

The challenge of this project was to run the server inside a [Raspberry Pi Zero W](https://www.raspberrypi.com/products/raspberry-pi-zero-w/). This small board integrates a BCM2835 (ARM 32-Bits / 1GHz) chipset and 512MB of SRAM. These restrictions made it an interesting project.

These are the details of the SSR logic:

* The SSR logic runs inside a WebAssembly module by embedding the [QuickJS](https://bellard.org/quickjs/) runtime (using [Javy](https://github.com/Shopify/javy))
* The WebAssembly runtime we chose is [Wazero](https://wazero.io/). The main reason was the restriction from the ARM 32-bits environment.
* The go handler also runs the HTTP server and serve the static files

## Prerequisites

The prerequisites for this project are:

* [Node](https://nodejs.org/en/)
* [Javy](https://github.com/Shopify/javy)
* [Go](https://go.dev/)
* Make

## Development

After installing the different prerequisites, you can run a development environment using the following command:

```
make dev
```

This command will:

1. Build the client site
1. Build the SSR server
1. Create a WebAssembly module composed by the SSR server and [QuickJS](https://bellard.org/quickjs/)
1. Build the Go handler for your current environment
1. Run the Go binary with the created wasm module

### Documentation

This project is composed by different parts. This section aims to introduce them and their purpose.

* The website application is the core of this project. The following files are related to the website:
  * `components`: list of web components (PreactJS) used to build the site
  * `pages`: the different views included in the site
  * `public`: static files required for the website
  * `App.js` / `App.css`: main website component. It defines the router and the basic styles, and mount the different components
  * `client.js` / `index.html`: entrypoints to generate the client project.
  * `package.json` / `package-lock.json`: define the project and its dependencies
  * `server.js`: entrypoint to generate the server project (wasm module entrypoint)
  * `vite.config.js`: [vite](https://vitejs.dev/) configuration to build the client
  * `vite.config.server.js`: [vite](https://vitejs.dev/) configuration to build the server
* The `handler` folder includes the Go HTTP handler and runtime. This project uses [Wazero](https://wazero.io/) to instantiate and run the WebAssembly module
* The `Makefile` calls the different tools to build the project

## Deployment to a Raspberry Pi Zero W

To deploy this project to a Raspberry Pi Zero W, you need first to compile it. For that, you will need a Linux machine that includes the tooling in the "Prerequisites" section.

Then, run the following command:

```
make build
```

This command will create a final `build.tar.gz` file in the project root folder. Then, you need to run the following commands to start serving the site in the Raspberry Pi Zero W:

```
scp ./build.tar.gz pi@PI_ZERO_IP_ADDRESS:~

# SSH into the Raspberry Pi
ssh pi@PI_ZERO_IP_ADDRESS
tar xvf build.tar.gz
./ssr-handler ./ssr.wasm
```

Then, you can access to the site in <http://PI_ZERO_IP_ADDRESS:8080>.

Note that it takes some time to boot the server (~10s) and to prerender the pages (~5-15s). This is one of the further exploration topics around this project.

## Let's keep in touch

You can find all our projects and articles in <https://wasmlabs.dev>. You can also follow our [@vmwwasm Twitter account](https://twitter.com/vmwwasm) to stay up to date.
