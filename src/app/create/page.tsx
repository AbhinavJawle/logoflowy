"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { StepForward, CircleChevronLeft } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";

interface FormData {
  logoTitle?: string;
  desc?: string;
  palette?: string;
  design?: { title: string; image: string; prompt: string };
  idea?: string; // Assuming idea is also a string
}

function Createlogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const onHandleInputChange = (field: keyof FormData, value: any) => {
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
        {step === 1 ? (
          <LogoTitle
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("logoTitle", value)
            }
          />
        ) : step === 2 ? (
          <LogoDesc
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("desc", value)
            }
          />
        ) : step === 3 ? (
          <LogoColorPalette
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("palette", value)
            }
          />
        ) : step === 4 ? (
          <LogoDesigns
            formData={formData}
            onHandleInputChange={(value: any) =>
              onHandleInputChange("design", value)
            }
          />
        ) : step === 5 ? (
          <LogoIdea
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("idea", value)
            }
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
