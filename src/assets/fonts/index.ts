import path from "path";
import { readFileSync } from "fs";

export function getRobotoFonts(): {
  robotoRegularBuffer: Buffer;
  robotoItalicBuffer: Buffer;
} {
  const robotoRegularFontPath = path.resolve(
    path.dirname,
    "Roboto/static/Roboto-Regular.ttf"
  );
  const robotoItalicFontPath = path.resolve(
    __dirname,
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
