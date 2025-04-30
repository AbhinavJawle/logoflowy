import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

import type { FormData } from "../page";

interface LogoIdeaProps {
  formData: FormData;
  onHandleInputChange: (value: string) => void;
}

function LogoIdea({ formData, onHandleInputChange }: LogoIdeaProps) {
  const [ideas, setIdeas] = useState<string[]>();
  const [isloading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);

  useEffect(() => {
    generateAiDesignIdeas();
  }, []);
  const generateAiDesignIdeas = async () => {
    setIsLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design?.title || ""
    )
      .replace("{logoTitle}", formData?.logoTitle || "")
      .replace("{logoDesc}", formData?.desc || "")
      // .replace("{logoPrompt}", formData?.design?.prompt || "")
      // .replace("{logoSimplicity}", formData?.simplicity?.prompt || "")
      .replace("{logoTone}", formData?.logoTone?.title || "");

    const result = await axios.post("/api/ai-design-idea", { prompt: PROMPT });
    !ideas && setIdeas(result.data.ideas);
    console.log(result.data);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Select Your Design Idea"}
        description={
          "Choose a design style that aligns with your vision, or skip to receive a random suggestion."
        }
      />

      {isloading && <Loader2Icon className="animate-spin my-10" />}

      <div className="flex flex-wrap justify-center gap-3">
        {ideas &&
          ideas.map((item, index) => (
            <h2
              key={index}
              onClick={() => {
                setSelectedOption(item);
                onHandleInputChange(item);
              }}
              className={`py-1.5 px-3 border rounded-md cursor-pointer text-center w-[230px]
            hover:border-primary ${selectedOption == item && "border-primary"}`}
            >
              {item}
            </h2>
          ))}

        {ideas && (
          <h2
            onClick={() => {
              setSelectedOption("Let AI Select the best idea");
              onHandleInputChange("Let AI Select the best idea");
            }}
            className={`py-1.5 px-3 border rounded-md cursor-pointer text-center w-[230px]
            hover:border-primary ${
              selectedOption == "Let AI Select the best idea" &&
              "border-primary"
            }`}
          >
            Let AI Select the best idea
          </h2>
        )}
      </div>
    </div>
  );
}

export default LogoIdea;
