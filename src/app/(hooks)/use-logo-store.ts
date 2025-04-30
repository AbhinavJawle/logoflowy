import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Layout, Customization } from "@/app/(types)/logo";

const LOGO_STORE_KEY = "dummylogo_v0.2";
const DEFAULT_LOGO_STORE = {
  name: undefined,
  color: "#FAFAFA",
  bgColor: "#252626",
  layout: "left",
  iconSize: 40,
  fontSize: 32, // Added default font size
  gap: 10, // Added default gap
  styles: undefined,
} as Customization;

interface LogoStore extends Customization {
  setName: (name: string) => void;
  setLayout: (value: Layout) => void;
  setColor: (value: string) => void;
  setBgColor: (value: string) => void;
  setIconSize: (value: number) => void; // Added icon size setter
  setFontSize: (value: number) => void; // Added font size setter
  setGap: (value: number) => void; // Added gap setter
  setStyles: (value?: React.CSSProperties) => void;
  reset: () => void;
}

export const useLogoStore = create<LogoStore>()(
  persist(
    (set, _get) => ({
      ...DEFAULT_LOGO_STORE,
      setName: (name) => set(() => ({ name })),
      setLayout: (layout) => set(() => ({ layout })),
      setColor: (color) => set(() => ({ color })),
      setBgColor: (bgColor) => set(() => ({ bgColor })),
      setIconSize: (iconSize) => set(() => ({ iconSize })), // Added icon size setter logic
      setFontSize: (fontSize) => set(() => ({ fontSize })), // Added font size setter logic
      setGap: (gap) => set(() => ({ gap })), // Added gap setter logic
      setStyles: (styles) => set(() => ({ styles })),
      reset: () =>
        set(() => ({
          ...DEFAULT_LOGO_STORE,
        })),
    }),
    {
      name: LOGO_STORE_KEY,
    }
  )
);
