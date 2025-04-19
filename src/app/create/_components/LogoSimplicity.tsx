"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import SimpleData from "@/app/_data/SimpleData";
import Image from "next/image";

import type { FormData } from "../page";

interface LogoSimplicityProps {
  onHandleInputChange: (value: any) => void;
  formData: FormData;
}

function LogoSimplicity({
  onHandleInputChange,
  formData,
}: LogoSimplicityProps) {
  const [selectedSimplicity, setSelectedSimplicity] = useState(
    formData?.simplicity?.title
  );

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Simplicity"}
        description={"Select how simple or complex the logo the should be."}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {SimpleData.map((simplicity, index) => (
          <div
            key={index}
            className={`${
              selectedSimplicity === simplicity.title
                ? "border-2 border-primary"
                : ""
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              setSelectedSimplicity(simplicity.title);
              onHandleInputChange(simplicity);
            }}
          >
            {/* <div className="relative h-48 w-full overflow-hidden bg-gray-50">
              <Image
                src={simplicity.image}
                alt={simplicity.title}
                fill
                className="object-cover"
              />
            </div> */}
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {simplicity.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoSimplicity;
