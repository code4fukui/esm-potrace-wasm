import { potrace, init } from "../dist/index.js";
import { JPEG } from "https://code4fukui.github.io/JPEG/JPEG.js";

await init();

const srcfn = Deno.args[0];
const dstfn = Deno.args[1];
if (!srcfn || !dstfn) {
  console.log("img2svg [src] [dst]");
  Deno.exit(1);
}

const data = await Deno.readFile(srcfn);
const img = JPEG.decode(data);

const svg = await potrace(img, {
  turdsize: 2,
  turnpolicy: 4,
  alphamax: 1,
  opticurve: 1,
  opttolerance: 0.2,
  pathonly: false,
  extractcolors: false, // black and white
});
//console.log(svg);
await Deno.writeTextFile(dstfn, svg);
