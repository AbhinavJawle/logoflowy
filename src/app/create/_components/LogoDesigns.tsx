"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import LogoDesign from "@/app/_data/LogoDesign";
import Image from "next/image";

interface LogoDesignsProps {
  onHandleInputChange: (value: any) => void;
  formData?: any;
}

function LogoDesigns({ onHandleInputChange, formData }: LogoDesignsProps) {
  const [selectedDesign, setSelectedDesign] = useState(formData?.design?.title);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Your Logo Style"}
        description={
          "Select the type of logo design that best represents your brands unique identity."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {LogoDesign.map((design, index) => (
          <div
            key={index}
            className={`${
              selectedDesign === design.title ? "border-2 border-primary" : ""
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              setSelectedDesign(design.title);
              onHandleInputChange(design);
            }}
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-50">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {design.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
