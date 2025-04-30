"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useLogoStore } from "@/app/(hooks)/use-logo-store";

export function GapSlider() {
  const gap = useLogoStore((state) => state.gap || 0);
  const setGap = useLogoStore((state) => state.setGap);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="gap-slider">Gap</Label>
        <span className="text-sm text-muted-foreground">{gap}px</span>
      </div>
      <Slider
        id="gap-slider"
        min={0}
        max={50} // Adjust max gap as needed
        step={1}
        value={[gap]}
        onValueChange={(value) => setGap(value[0])}
      />
    </div>
  );
}
