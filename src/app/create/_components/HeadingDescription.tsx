import React from "react";

interface HeadingDescriptionProps {
  title: string;
  description: string;
}

function HeadingDescription({ title, description }: HeadingDescriptionProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-2xl md:text-3xl text-primary mb-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  );
}

export default HeadingDescription;
