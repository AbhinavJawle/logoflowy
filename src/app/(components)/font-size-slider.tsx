"use client";

import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 72;
const STEP = 1;

export const FontSizeSlider = () => {
  const fontSize = useLogoStore((state) => state.fontSize);
  const setFontSize = useLogoStore((state) => state.setFontSize);

  const handleSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  return (
    <div className="flex flex-col gap-y-2 items-center px-2 w-32">
      <div className="flex justify-between w-full">
        <Label
          htmlFor="font-size-slider"
          className="text-xs text-muted-foreground"
        >
          Font Size
        </Label>
        <span className="text-xs font-medium">{fontSize}</span>
      </div>
      <Slider
        id="font-size-slider"
        defaultValue={[fontSize ?? MIN_FONT_SIZE]}
        value={[fontSize ?? MIN_FONT_SIZE]}
        min={MIN_FONT_SIZE}
        max={MAX_FONT_SIZE}
        step={STEP}
        onValueChange={handleSizeChange}
        className="w-full"
      />
    </div>
  );
};
