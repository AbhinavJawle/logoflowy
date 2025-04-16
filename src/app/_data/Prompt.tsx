export default {
  DESIGN_IDEA_PROMPT:
    "Imagine you're a logo designer tasked with crafting a unique and memorable logo for a brand named {logoTitle}. The logo should be of type {logoType} and visually represent the brand's description: {logoDesc}. Consider the existing prompt: {logoPrompt} for additional context, but feel free to explore beyond its limitations. Factor in the desired simplicity level: {logoSimplicity}, whether text and logo should be: {logoSep} , and whether it should be: {logoOnly}. Brainstorm 5-6 distinct logo ideas, each summarised in a concise phrase (4-5 words). Deliver the ideas in JSON format",
  LOGO_PROMPT:
    "Generate a text prompt for logo for the brand '{logoTitle}' that includes {logoOnly}. The brand is described as {logoDesc}. The logo should be designed in the {logoDesign} style, drawing inspiration from {logoPrompt}, and should embody the concept of {logoIdea}. Use the color palette {logoColor} for the design. The logo should have a {logoSimplicity} aesthetic, and the typography and logo mark should be {logoSep}. Give me result in JSON format with prompt field only. The prompt should be strictly under 950 characters",
};
