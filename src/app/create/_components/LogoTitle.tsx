"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

import type { FormData } from "../page";

interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
  formData: FormData;
}

function LogoTitle({ onHandleInputChange, formData }: LogoTitleProps) {
  const searchParams = useSearchParams();
  const [logoTitle, setLogoTitle] = useState<string>(searchParams?.get("logoTitle") ?? "");
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Your Brand or Company Name"}
        description={
          "Add Your Business, App, or Website Name for a Custom Logo"
        }
      />
      <Input
        placeholder="Enter your brand name"
        className="w-full rounded-md focus-visible:ring-offset-0 focus-visible:ring-1"
        value={formData.logoTitle}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

export default LogoTitle;
