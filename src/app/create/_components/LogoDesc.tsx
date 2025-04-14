import React from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";

function LogoDesc({ onHandleInputChange }) {
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Enter Description"}
        description={"Add Your Description or Slogan"}
      />
      <Input
        placeholder="Enter your description"
        className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-1"
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
