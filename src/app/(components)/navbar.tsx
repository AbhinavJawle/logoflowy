"use client";
import { LogoNameEditor } from "@/app/(components)/logo-name-editor";
import { LayoutPicker } from "@/app/(components)/layout-picker";
import { IconStyleSelector } from "@/app/(components)/icon-style-selector";
import { TextColorPicker } from "@/app/(components)/text-color-picker";
import { BgColorPicker } from "@/app/(components)/bg-color-picker";
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export const Navbar = () => {
  return (
    <div className="h-16 flex items-center justify-between gap-x-2 lg:gap-x-10 px-4 lg:px-6">
      <nav className="items-center gap-x-2 h-full hidden md:flex">
        <LogoNameEditor />
        <LayoutPicker />
        <IconStyleSelector />
        <TextColorPicker />
        <BgColorPicker />
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/moiseshp/dummylogo"
            target="_blank"
            title="Go to github project"
            className="font-semibold"
          >
            <GithubLogo />
          </a>
        </Button>
      </nav>
      <nav className="block md:hidden">
        <Button variant="ghost" size="icon">
          <List />
        </Button>
      </nav>
    </div>
  );
};
