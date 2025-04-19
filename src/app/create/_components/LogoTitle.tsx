"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import type { FormData } from "../page";

interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
  formData: FormData;
  onInputValidityChange: (isValid: boolean) => void;
}

function LogoTitle({
  onHandleInputChange,
  formData,
  onInputValidityChange,
}: LogoTitleProps) {
  const searchParams = useSearchParams();
  const logoTitleParam = searchParams?.get("logoTitle") ?? "";

  useEffect(() => {
    if (!formData.logoTitle && logoTitleParam) {
      onHandleInputChange(logoTitleParam);
    }
  }, [logoTitleParam, formData.logoTitle, onHandleInputChange]);

  useEffect(() => {
    onInputValidityChange(!!formData.logoTitle?.trim());
  }, [formData.logoTitle, onInputValidityChange]);

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
        defaultValue={formData.logoTitle}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
}

import { Suspense } from "react";

export function LogoTitleComponent(props: LogoTitleProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogoTitle {...props} />
    </Suspense>
  );
}

export default LogoTitleComponent;
