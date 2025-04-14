"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { StepForward, CircleChevronLeft } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";

function Createlogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mt-4 md:mt-8 lg:mt-12 p-6 md:p-8 border rounded-lg shadow-sm bg-white max-w-3xl mx-auto">
        {/* //Entire form and step management logi is here: */}
        {step == 1 ? (
          <LogoTitle
            onHandleInputChange={(value) =>
              onHandleInputChange("logoTitle", value)
            }
            formData={formData}
          />
        ) : step == 2 ? (
          <LogoDesc
            onHandleInputChange={(value) => onHandleInputChange("desc", value)}
            formData={formData}
          />
        ) : step == 3 ? (
          <LogoColorPalette
            onHandleInputChange={(value) =>
              onHandleInputChange("palette", value)
            }
            formData={formData}
          />
        ) : step == 4 ? (
          <LogoDesigns
            onHandleInputChange={(value) =>
              onHandleInputChange("design", value)
            }
            formData={formData}
          />
        ) : step == 5 ? (
          <LogoIdea
            onHandleInputChange={(value) => onHandleInputChange("idea", value)}
            formData={formData}
          />
        ) : null}

        <div className="flex flex-col sm:flex-row gap-4 mt-8 max-w-2xl mx-auto">
          {step != 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="cursor-pointer flex items-center gap-2"
            >
              <CircleChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </Button>
          )}
          {/* <div className="flex-grow"></div> */}
          <Button
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setStep(step + 1)}
          >
            <span>Next</span>
            <StepForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Createlogo;
