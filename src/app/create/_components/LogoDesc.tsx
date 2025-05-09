import React from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";

import type { FormData } from "../page";

interface LogoDescProps {
  onHandleInputChange: (value: string) => void;
  formData: FormData;
}

function LogoDesc({ onHandleInputChange, formData }: LogoDescProps) {
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Enter Description"}
        description={"Add Your Description or Slogan"}
      />
      <Input
        placeholder="Enter your description"
        className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-1"
        value={formData.desc}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoDesc;
