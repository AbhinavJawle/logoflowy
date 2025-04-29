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
    const fallbackSvg = `<svg width="${size}px" height="${size}px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="${color || 'currentColor'}"/></svg>`;
    
    // Process the SVG content to ensure it has the right size
    const processedSvg = React.useMemo(() => {
      if (!svgContent) return fallbackSvg;
      
      try {
        // Create a temporary DOM element to parse the SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgContent, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');
        
        if (svgElement) {
          // Set fixed width and height
          svgElement.setAttribute('width', `${size}px`);
          svgElement.setAttribute('height', `${size}px`);
          
          // Apply color if specified
          if (color) {
            // Try to set color on paths and other elements
            const elements = svgElement.querySelectorAll('path, circle, rect, polygon');
            elements.forEach(el => {
              if (!el.getAttribute('fill') || el.getAttribute('fill') === 'none') {
                el.setAttribute('fill', color);
              }
            });
          }
          
          // Convert back to string
          return new XMLSerializer().serializeToString(svgElement);
        }
      } catch (error) {
        console.error('Error processing SVG:', error);
      }
      
      return fallbackSvg;
    }, [svgContent, size, color]);

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
