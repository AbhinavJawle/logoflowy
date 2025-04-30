"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SVGLogoProps {
  svgContent: string;
  size?: number;
  color?: string;
  className?: string;
  imageUrl?: string;
}

export const SVGLogo: React.FC<SVGLogoProps> = React.memo(
  ({ svgContent, size = 24, color, className }) => {
    // Create a simple SVG placeholder if no content
    const fallbackSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="${
      color || "currentColor"
    }"/></svg>`;

    // Process the SVG content minimally to set size, preserving internal styles
    const processedSvg = React.useMemo(() => {
      if (!svgContent) return fallbackSvg;

      try {
        // Use regex to set width and height attributes on the root SVG tag
        // This avoids parsing and reserializing, which might strip style tags
        let updatedSvg = svgContent;
        updatedSvg = updatedSvg.replace(/<svg[^>]*>/, (match) => {
          let newAttrs = ` width="${size}px" height="${size}px" `;
          // Remove existing width/height attributes if they exist
          match = match.replace(/ width="[^ "]*"/, "");
          match = match.replace(/ height="[^ "]*"/, "");
          // Add new attributes just before the closing >
          return match.slice(0, -1) + newAttrs + ">";
        });

        return updatedSvg;
      } catch (error) {
        console.error("Error processing SVG for preview:", error);
      }

      return fallbackSvg; // Return fallback if processing fails
    }, [svgContent, size]); // Removed color dependency as we are not applying it here

    return (
      <div
        className={cn("inline-block", className)}
        style={{ width: `${size}px`, height: `${size}px` }}
        dangerouslySetInnerHTML={{ __html: processedSvg }}
      />
    );
  }
);

SVGLogo.displayName = "SVGLogo";
