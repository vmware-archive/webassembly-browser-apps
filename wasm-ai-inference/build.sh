#!/usr/bin/env bash

if [[ -z "${WASI_SDK_PATH}" ]]; then
  echo "WASI_SDK_PATH must me defined"
  echo "You can download the SDK from: https://github.com/WebAssembly/wasi-sdk"
  exit 1
fi

CC=$WASI_SDK_PATH/bin/clang
LINKER_FLAGS="-Wl,--no-entry,--allow-undefined,-lwasi-emulated-mman,-lwasi-emulated-process-clocks"
FLAGS="-D_WASI_EMULATED_MMAN -D_WASI_EMULATED_PROCESS_CLOCKS"
RUN_C=llama2.c/run.c
OUTPUT=dist/static/llama2-c.wasm
OUTPUT_MODEL=dist/static/model/stories260K.bin
OUTPUT_TOKENIZER=dist/static/model/tokenizer.bin

if [[ ! -f "$RUN_C" ]]; then
  echo "You must initialize the submodule: git submodule update --init"
  exit 1
fi

# Build!
echo "Building the llama2.c project"
$CC --target=wasm32-wasi $LINKER_FLAGS $FLAGS -O0 -s -o $OUTPUT $RUN_C

echo "Downloading the Tinyllamas model from: https://huggingface.co/karpathy/tinyllamas/tree/main"
wget -O $OUTPUT_MODEL --no-clobber https://huggingface.co/karpathy/tinyllamas/resolve/main/stories260K/stories260K.bin
wget -O $OUTPUT_TOKENIZER --no-clobber https://huggingface.co/karpathy/tinyllamas/resolve/main/stories260K/tok512.bin
