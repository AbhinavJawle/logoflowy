"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import LogoToneData from "@/app/_data/LogoToneData";
interface LogoToneProps {
  onHandleInputChange: (value: any) => void;
  formData?: any;
}

function LogoTone({ onHandleInputChange, formData }: LogoToneProps) {
  const [LogoTone, setLogoTone] = useState(formData?.logoTone?.title);

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Choose Tone"}
        description={"Select the tone of the logo."}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {LogoToneData.map((tone, index) => (
          <div
            key={index}
            className={`${
              LogoTone === tone.title ? "border-2 border-primary" : ""
            } flex flex-col overflow-hidden rounded-md border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              setLogoTone(tone.title);
              onHandleInputChange(tone);
            }}
          >
            <div className="py-2 px-3 text-center bg-white text-sm font-medium">
              {tone.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoTone;
