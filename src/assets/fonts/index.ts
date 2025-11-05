import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

export function getRobotoFonts(): {
  robotoRegularBuffer: Buffer;
  robotoItalicBuffer: Buffer;
  robotoSemiBoldBuffer: Buffer;
  robotoBlackBuffer: Buffer;
  robotoSemiBoldItalicBuffer: Buffer;
  robotoBlackItalicBuffer: Buffer;
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
  const robotoSemiBoldFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-SemiBold.ttf"
  );
  const robotoBlackFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-Black.ttf"
  );
  const robotoSemiBoldItalicFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-SemiBoldItalic.ttf"
  );
  const robotoBlackItalicFontPath = path.resolve(
    projectRoot,
    "Roboto/static/Roboto-BlackItalic.ttf"
  );
  console.log(robotoItalicFontPath);
  console.log(robotoItalicFontPath);
  const robotoRegularBuffer = readFileSync(robotoRegularFontPath);
  const robotoItalicBuffer = readFileSync(robotoItalicFontPath);
  const robotoSemiBoldBuffer = readFileSync(robotoSemiBoldFontPath);
  const robotoBlackBuffer = readFileSync(robotoBlackFontPath);
  const robotoSemiBoldItalicBuffer = readFileSync(robotoSemiBoldItalicFontPath);
  const robotoBlackItalicBuffer = readFileSync(robotoBlackItalicFontPath);

  return {
    robotoRegularBuffer,
    robotoItalicBuffer,
    robotoSemiBoldBuffer,
    robotoBlackBuffer,
    robotoSemiBoldItalicBuffer,
    robotoBlackItalicBuffer,
  };
}
