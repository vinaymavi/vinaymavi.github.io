import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export function getRobotoFonts(): {
  robotoRegularBuffer: Buffer;
  robotoItalicBuffer: Buffer;
} {
  // Get the current directory in ES modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.warn(`DIR PATH = ${__dirname}`);
  const projectRoot = path.resolve(__dirname, "../../../src/assets/fonts");

  const robotoRegularFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-Regular.ttf"
  );
  const robotoItalicFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-Italic.ttf"
  );
  console.log(robotoItalicFontPath);
  console.log(robotoItalicFontPath);
  const robotoRegularBuffer = readFileSync(robotoRegularFontPath);
  const robotoItalicBuffer = readFileSync(robotoItalicFontPath);

  return {
    robotoRegularBuffer,
    robotoItalicBuffer,
  };
}
