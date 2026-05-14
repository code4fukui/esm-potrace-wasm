# esm-potrace-wasm

ラスタ画像をベクターグラフィックス（SVG）に変換する [Potrace](http://potrace.sourceforge.net/) ライブラリのモダンな ESM WebAssembly ビルドです。

## 採用アプリ

このライブラリは [SVGcode](https://svgco.de/) で使用されています。

<a href="https://svgco.de/">
  <img src="https://github.com/tomayac/SVGcode/raw/main/public/screenshots/desktop.png" alt="SVGcode application screenshot" width="707" height="497" />
</a>

## 特徴

*   ラスタ画像（例: JPEG、PNG）をスケーラブルベクターグラフィックス（SVG）に変換します。
*   カラーおよび白黒のトレースモードをサポートします。
*   出力を微調整するためのトレースパラメータを設定可能です。
*   ブラウザや Deno などのサーバーサイド環境で動作します。
*   モダンな ES モジュール（ESM）としてパッケージ化されています。
*   Potrace の WebAssembly (Wasm) ビルドによる高性能なトレースを実現します。

## 使い方

### ブラウザでの使用

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

### Deno (CLI) での使用

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

## API リファレンス

### `init(): Promise<void>`

WebAssembly モジュールを初期化します。`potrace` を使用する前に、一度だけ呼び出して待機（await）する必要があります。

### `potrace(imageBitmapSource, options): Promise<string>`

入力画像をトレースし、SVG 文字列を返します。

*   **`imageBitmapSource`**: `ImageBitmapSource`。`HTMLImageElement`、`SVGImageElement`、`HTMLVideoElement`、`HTMLCanvasElement`、`ImageData`、`ImageBitmap`、または `Blob` を指定できます。
*   **`options`**: トレースパラメータを含むオプションのオブジェクト。

#### オプション

| パラメータ | 説明 | デフォルト |
| :--- | :--- | :--- |
| `turdsize` | このサイズ（ピクセル単位）以下の斑点（スペックル）を除去します。 | `2` |
| `turnpolicy` | パス分解時の曖昧さを解決するポリシー。 | `4` |
| `alphamax` | コーナーの閾値パラメータ。 | `1` |
| `opticurve` | 曲線最適化の有効/無効。 | `1` (有効) |
| `opttolerance` | 曲線最適化の許容誤差。 | `0.2` |
| `pathonly` | `true` の場合、完全な SVG ではなくパスデータ文字列の配列を返します。 | `false` |
| `extractcolors` | `true` の場合、カラーでトレースします。`false` の場合、白黒でトレースします。 | `true` |
| `posterizelevel` | カラーモードの量子化レベル数（範囲: 1〜255）。 | `5` |
| `posterizationalgorithm` | カラーポスタリゼーションのアルゴリズム: `0` はシンプル、`1` は補間。 | `1` |

## 開発

`src/potrace/` を変更し、`npm run build` を実行して `dist/` 内の ESM ビルドを更新します。
Emscripten のビルドファイルはそれぞれ `./build.sh`（Win32 の場合は `build.ps1`）にあります。`dist/index.js` をインポートする簡単なデモが `demo/` に用意されており、`npm start` を実行することで起動できます。

## ライセンス

⚠️ GPL-v2.0（オリジナルの [Potrace license](http://potrace.sourceforge.net/#license) に準拠）。
