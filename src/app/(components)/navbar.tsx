"use client";
import { LogoNameEditor } from "@/app/(components)/logo-name-editor";
import { LayoutPicker } from "@/app/(components)/layout-picker";
import { TextColorPicker } from "@/app/(components)/text-color-picker";
import { BgColorPicker } from "@/app/(components)/bg-color-picker";
import { FontSelector } from "@/app/(components)/font-selector";
import { IconSizeSlider } from "@/app/(components)/icon-size-slider";
import { FontSizeSlider } from "@/app/(components)/font-size-slider";
import { GapSlider } from "@/app/(components)/gap-slider"; // Added
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      {/* Desktop view - single line */}
      <div className="hidden lg:flex items-center h-16 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center justify-between w-full">
          {/* <LogoNameEditor /> */}
          <LayoutPicker />
          <FontSelector />
          <IconSizeSlider />
          <FontSizeSlider />
          {/* <GapSlider /> */}
          <TextColorPicker />
          <BgColorPicker />
        </nav>
      </div>

      {/* Tablet view - more structured two rows */}
      <div className="hidden md:block lg:hidden">
        <div className="flex items-center justify-evenly h-14 px-4">
          <div className="flex-1 flex justify-center">
            <LayoutPicker />
          </div>
          <div className="flex-1 flex justify-center">
            <FontSelector />
          </div>
          <div className="flex-1 flex justify-center">
            <IconSizeSlider />
          </div>
        </div>
        <div className="flex items-center justify-evenly h-14 px-4 border-t border-gray-100">
          <div className="flex-1 flex justify-center">
            <FontSizeSlider />
          </div>
          <div className="flex-1 flex justify-center">
            <TextColorPicker />
          </div>
          <div className="flex-1 flex justify-center">
            <BgColorPicker />
          </div>
        </div>
      </div>

      {/* Mobile view - stacked with proper alignment */}
      <div className="md:hidden px-4 py-3">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center">
            <LayoutPicker />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center">
              <FontSelector />
            </div>
            <div className="flex justify-center">
              <IconSizeSlider />
            </div>
            <div className="flex justify-center">
              <FontSizeSlider />
            </div>
            <div className="flex justify-center">
              <TextColorPicker />
            </div>
            <div className="flex justify-center items-center col-span-2">
              <BgColorPicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
