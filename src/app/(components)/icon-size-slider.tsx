"use client";

import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MIN_ICON_SIZE = 16;
const MAX_ICON_SIZE = 100;
const STEP = 2;

export const IconSizeSlider = () => {
  const iconSize = useLogoStore((state) => state.iconSize);
  const setIconSize = useLogoStore((state) => state.setIconSize);

  const handleSizeChange = (value: number[]) => {
    setIconSize(value[0]);
  };

  return (
    <div className="flex flex-col gap-y-2 items-center px-2 w-32">
      <div className="flex justify-between w-full">
        <Label
          htmlFor="icon-size-slider"
          className="text-xs text-muted-foreground"
        >
          Icon Size
        </Label>
        <span className="text-xs font-medium">{iconSize}</span>
      </div>
      <Slider
        id="icon-size-slider"
        defaultValue={[iconSize ?? MIN_ICON_SIZE]}
        value={[iconSize ?? MIN_ICON_SIZE]}
        min={MIN_ICON_SIZE}
        max={MAX_ICON_SIZE}
        step={STEP}
        onValueChange={handleSizeChange}
        className="w-full"
      />
    </div>
  );
};
