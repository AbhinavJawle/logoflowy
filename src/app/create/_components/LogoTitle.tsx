import React from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";

function LogoTitle() {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <HeadingDescription title={"Title1"} description={"Title2"} />
      <Input
        placeholder="Enter your brand name"
        className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-1"
      />
    </div>
  );
}

export default LogoTitle;
