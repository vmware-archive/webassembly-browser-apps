all: build

build: build-client build-ssr build-handler pack

build-64: build-client build-ssr build-handler-64 pack

dev: build-client build-ssr build-handler-dev run

build-client:
	npm run build

build-ssr:
	npm run build:ssr && javy ./dist-ssr/zero-wasm-demo.js -o ./ssr.wasm

build-handler-dev:
	make -C ./handler build-dev && mv ./handler/ssr-handler ./

build-handler:
	make -C ./handler build && mv ./handler/ssr-handler ./

build-handler-64:
	make -C ./handler build-64 && mv ./handler/ssr-handler ./

pack:
	tar czf build.tar.gz ssr-handler ssr.wasm dist

run:
	./ssr-handler ./ssr.wasm ./dist
