import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";
import Colors from "@/app/_data/Colors";

import type { FormData } from "../page";

interface LogoColorPaletteProps {
  onHandleInputChange: (value: string) => void;
  formData: FormData;
}

function LogoColorPalette({
  onHandleInputChange,
  formData,
}: LogoColorPaletteProps) {
  const [selectedOption, setSelectedOption] = useState(formData?.palette);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Your Color Palette"}
        description={
          "Pick the colors that reflect your brands personality and create a lasting impression."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Colors.map((palette, index) => (
          <div
            key={index}
            className={`${
              selectedOption == palette.name && "border-2 border-primary"
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex flex-col h-40">
              {palette.colors.map((color, colorIndex) => (
                <div
                  className="flex-1"
                  style={{ backgroundColor: color }}
                  key={colorIndex}
                  onClick={() => {
                    setSelectedOption(palette.name);
                    onHandleInputChange(palette.name);
                  }}
                ></div>
              ))}
            </div>
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {palette.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPalette;
