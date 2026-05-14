# esm-potrace-wasm

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A modern ESM WebAssembly build of the [Potrace](http://potrace.sourceforge.net/) library for converting raster images into vector graphics (SVG).

## Apps Using This

This library is used in [SVGcode](https://svgco.de/).

<a href="https://svgco.de/">
  <img src="https://github.com/tomayac/SVGcode/raw/main/public/screenshots/desktop.png" alt="SVGcode application screenshot" width="707" height="497" />
</a>

## Features

*   Converts raster images (e.g., JPEG, PNG) to scalable vector graphics (SVG).
*   Supports both color and black & white tracing modes.
*   Configurable tracing parameters for fine-tuning output.
*   Runs in the browser and in server-side environments like Deno.
*   Packaged as a modern ES Module (ESM).
*   High-performance tracing powered by a WebAssembly (Wasm) build of Potrace.

## Usage

### In the Browser

```javascript
import { potrace, init } from "https://code4fukui.github.io/esm-potrace-wasm/dist/index.js";

// Initialize the Wasm module once.
await init();

const imageBlob = await (await fetch("./image.jpg")).blob();
const svg = await potrace(imageBlob, {
  extractcolors: true, // trace in color
  posterizelevel: 5,   // number of colors
});

document.body.innerHTML = svg;
```

### In Deno (CLI)

```javascript
import { potrace, init } from "https://code4fukui.github.io/esm-potrace-wasm/dist/index.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";

// Initialize the Wasm module once.
await init();

const data = await Deno.readFile("./input.jpg");
const img = JPEG.decode(data); // The potrace function needs decoded image data

const svg = await potrace(img, {
  extractcolors: false, // trace in black and white
});

await Deno.writeTextFile("./output.svg", svg);
```

## API Reference

### `init(): Promise<void>`

Initializes the WebAssembly module. This must be called and awaited once before using `potrace`.

### `potrace(imageBitmapSource, options): Promise<string>`

Traces the input image and returns an SVG string.

*   **`imageBitmapSource`**: An `ImageBitmapSource`, which can be an `HTMLImageElement`, `SVGImageElement`, `HTMLVideoElement`, `HTMLCanvasElement`, `ImageData`, `ImageBitmap`, or `Blob`.
*   **`options`**: An optional object with tracing parameters.

#### Options

| Parameter | Description | Default |
| :--- | :--- | :--- |
| `turdsize` | Suppress speckles of this size (in pixels). | `2` |
| `turnpolicy` | How to resolve ambiguities in path decomposition. | `4` |
| `alphamax` | Corner threshold parameter. | `1` |
| `opticurve` | Enable or disable curve optimization. | `1` (enabled) |
| `opttolerance` | Curve optimization tolerance. | `0.2` |
| `pathonly` | If `true`, returns an array of path data strings instead of a full SVG. | `false` |
| `extractcolors` | If `true`, trace in color. If `false`, trace in black and white. | `true` |
| `posterizelevel` | Number of quantization levels for color mode (range: 1-255). | `5` |
| `posterizationalgorithm` | Algorithm for color posterization: `0` for simple, `1` for interpolation. | `1` |

## Developing

Modify `src/potrace/` and run `npm run build` to update the ESM build in `dist/`.
The emscripten build file is located at `./build.sh` (or `build.ps1` for Win32) respectively. A simple demo
that imports `dist/index.js` is available in `demo/` and can be started by running `npm start`.

## License

⚠️ GPL-v2.0, due to the original [Potrace license](http://potrace.sourceforge.net/#license).