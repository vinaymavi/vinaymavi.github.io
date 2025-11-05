import satori from "satori";
import type { ReactNode } from "react";
import { getRobotoFonts } from "../assets/fonts";
const {
  robotoItalicBuffer,
  robotoRegularBuffer,
  robotoSemiBoldBuffer,
  robotoBlackBuffer,
  robotoSemiBoldItalicBuffer,
  robotoBlackItalicBuffer,
} = getRobotoFonts();

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
    {
      name: "Roboto",
      data: robotoSemiBoldBuffer,
      weight: 600,
      style: "normal",
    },
    {
      name: "Roboto",
      data: robotoBlackBuffer,
      weight: 900,
      style: "normal",
    },
    {
      name: "Roboto",
      data: robotoSemiBoldItalicBuffer,
      weight: 600,
      style: "italic",
    },
    {
      name: "Roboto",
      data: robotoBlackItalicBuffer,
      weight: 900,
      style: "italic",
    },
  ],
};

export async function katori(html: ReactNode): Promise<string> {
  const svg = await satori(html, options);
  return svg;
}

export default katori;
