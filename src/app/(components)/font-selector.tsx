"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import allLogoOptions from "@/app/(data)/all-logo-options.json";

// Extract unique font families from the comprehensive logo options data
const fontFamilies = Array.from(
  new Set(allLogoOptions.map((logo) => logo.styles.fontFamily))
).sort();

export function FontSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  
  const setStyles = useLogoStore((state) => state.setStyles);
  const currentStyles = useLogoStore((state) => state.styles);

  // Find the logo with the selected font family
  const handleSelectFont = (fontFamily: string) => {
    setValue(fontFamily);
    setOpen(false);
    
    // Find a logo with this font family from the comprehensive options to get its styles
    const logoWithFont = allLogoOptions.find(
      (logo) => logo.styles.fontFamily === fontFamily
    );
    
    if (logoWithFont) {
      // Set the font styles in the global store
      setStyles(logoWithFont.styles);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <Type className="mr-2 h-4 w-4" />
          {value ? value : "Select font..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
        {fontFamilies.map((font) => (
          <DropdownMenuItem
            key={font}
            onClick={() => handleSelectFont(font)}
            className="flex items-center"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === font ? "opacity-100" : "opacity-0"
              )}
            />
            <span style={{ fontFamily: font }}>{font}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
