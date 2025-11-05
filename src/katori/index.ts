import satori from "satori";
import type { ReactNode } from "react";
import { getRobotoFonts } from "../assets/fonts";
const { robotoItalicBuffer, robotoRegularBuffer } = getRobotoFonts();

const options = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Roboto",
      data: robotoRegularBuffer, // Non-italic variable font
      weight: 400, // Default weight (can be overridden in JSX)
      style: "normal",
    },
    {
      name: "Roboto",
      data: robotoItalicBuffer, // Italic variable font
      weight: 400, // Default weight (can be overridden in JSX)
      style: "italic",
    },
  ],
};

export async function katori(html: ReactNode): Promise<string> {
  const svg = await satori(html, options);
  return svg;
}

export default katori;
