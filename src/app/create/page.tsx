import React from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { StepForward, CircleChevronLeft } from "lucide-react";

function Createlogo() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mt-8 md:mt-16 lg:mt-28 p-6 md:p-10 border rounded-xl shadow-sm bg-white max-w-5xl mx-auto">
        <LogoTitle />

        <div className="flex flex-col sm:flex-row justify-between mt-12 gap-4">
          <Button
            variant="outline"
            className="cursor-pointer flex items-center gap-2"
          >
            <CircleChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </Button>
          <Button className="cursor-pointer flex items-center gap-2">
            <span>Next</span>
            <StepForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Createlogo;
