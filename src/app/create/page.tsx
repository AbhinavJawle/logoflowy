"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { StepForward, CircleChevronLeft } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import LogoSimplicity from "./_components/LogoSimplicity";
import LogoTone from "./_components/LogoTone";

export interface FormData {
  logoTitle?: string;
  desc?: string;
  palette?: string;
  design?: { title: string; image: string; prompt: string };
  idea?: string;
  simplicity?: { title: string; prompt: string };

  pricing?: string;
  logoTone?: { title: string; prompt: string };
}

function Createlogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isLogoTitleValid, setIsLogoTitleValid] = useState(false);

  const onHandleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mt-4 md:mt-8 lg:mt-12 p-6 md:p-8 border rounded-lg shadow-sm bg-white max-w-3xl mx-auto">
        {/* //Entire form and step management logic is here: */}
        {step === 1 ? (
          <LogoTitle
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("logoTitle", value)
            }
            onInputValidityChange={setIsLogoTitleValid}
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
          <LogoSimplicity
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("simplicity", value)
            }
          />
        ) : step === 6 ? (
          <LogoTone
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("logoTone", value)
            }
          />
        ) : step === 7 ? (
          <LogoIdea
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("idea", value)
            }
          />
        ) : step === 8 ? (
          <PricingModel
            formData={formData}
            onHandleInputChange={(value: string) =>
              onHandleInputChange("pricing", value)
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
          {(() => {
            const isNextDisabled = !isLogoTitleValid;
            return (
              <Button
                className="cursor-pointer flex items-center gap-2"
                onClick={() => setStep(step + 1)}
                disabled={isNextDisabled}
              >
                <span>Next</span>
                <StepForward className="h-5 w-5" />
              </Button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default Createlogo;
