"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import LogoOnlyData from "@/app/_data/LogoOnlyData";
import Image from "next/image";

interface LogoOnly {
  onHandleInputChange: (value: any) => void;
  formData?: any;
}

function LogoOnly({ onHandleInputChange, formData }: LogoOnly) {
  const [LogoOnly, setLogoOnly] = useState(formData?.logoSep?.title);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Separation"}
        description={"Select how logo and text should be separated."}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {LogoOnlyData.map((logoOnly, index) => (
          <div
            key={index}
            className={`${
              LogoOnly === logoOnly.title ? "border-2 border-primary" : ""
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              setLogoOnly(logoOnly.title);
              onHandleInputChange(logoOnly);
            }}
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-50">
              <Image
                src={logoOnly.image}
                alt={logoOnly.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {logoOnly.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoOnly;
