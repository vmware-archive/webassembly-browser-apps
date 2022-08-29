all: build

build: build-client build-ssr build-handler pack

build-64: build-client build-ssr build-handler-64 pack

dev: build-client build-ssr build-handler-dev run

build-client:
	npm run build

build-ssr:
	npm run build:ssr && javy ./dist-ssr/zero-wasm-demo.js -o ./ssr.wasm

build-handler-dev:
	make -C ./handler build-dev && mv ./handler/handler ./

build-handler:
	make -C ./handler build && mv ./handler/handler ./

build-handler-64:
	make -C ./handler build-64 && mv ./handler/handler ./

pack:
	tar czf build.tar.gz handler ssr.wasm dist

run:
	./handler ./ssr.wasm ./dist
