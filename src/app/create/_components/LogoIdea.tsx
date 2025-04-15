import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";

function LogoIdea({ formData }) {
  useEffect(() => {
    generateAiDesignIdeas();
  }, []);
  const generateAiDesignIdeas = async () => {
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoType}", formData?.design.title)
      .replace("{logoTitle}", formData?.logoTitle)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoPrompt}", formData?.design.prompt);

    const result = await axios.post("/api/ai-design-idea", { prompt: PROMPT });
    console.log(result.data);
  };
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <HeadingDescription
        title={"Select Your Design Idea"}
        description={
          "Choose a design style that aligns with your vision, or skip to receive a random suggestion."
        }
      />
    </div>
  );
}

export default LogoIdea;
