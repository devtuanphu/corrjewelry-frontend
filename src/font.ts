import { Quicksand } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Roboto } from "next/font/google";
import { Roboto_Condensed } from "next/font/google";
export const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const worksand = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const robotosand = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const robotocondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});
