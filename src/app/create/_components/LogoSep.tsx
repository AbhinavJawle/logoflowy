"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import TextSep from "@/app/_data/TextSep";
import Image from "next/image";

interface LogoSepProps {
  onHandleInputChange: (value: any) => void;
  formData?: any;
}

function LogoSep({ onHandleInputChange, formData }: LogoSepProps) {
  const [selectedSep, setSelectedSep] = useState(formData?.logoSep?.title);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Separation"}
        description={"Select how logo and text should be separated."}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {TextSep.map((logoSep, index) => (
          <div
            key={index}
            className={`${
              selectedSep === logoSep.title ? "border-2 border-primary" : ""
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              setSelectedSep(logoSep.title);
              onHandleInputChange(logoSep);
            }}
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-50">
              <Image
                src={logoSep.image}
                alt={logoSep.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {logoSep.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoSep;
