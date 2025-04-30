"use client";
import * as React from "react";
import { Customization } from "@/app/(types)/logo";
import { cn } from "@/lib/utils";
import { SVGLogo } from "./svg-logo";
import { useLogoStore } from "@/app/(hooks)/use-logo-store"; // Import the store

type LogotypeProps = {
  customization: Customization;
  icon: React.ComponentType<any>;
  className?: string;
  svgContent?: string;
};

const Logotype = React.memo(
  ({ customization, icon: Icon, className, svgContent }: LogotypeProps) => {
    // Use either the passed svgContent or the one from customization
    const finalSvgContent = svgContent || customization.svgContent;
    const gap = useLogoStore((state) => state.gap); // Get gap from store

    const gapStyle = React.useMemo(() => {
      switch (customization.layout) {
        case "top":
        case "bottom":
          return { gap: `${gap}px` }; // Apply gap for column layout
        case "left":
        case "right":
        default:
          return { gap: `${gap}px` }; // Apply gap for row layout
      }
    }, [customization.layout, gap]);

    return (
      <figure
        className={cn(
          "flex items-center", // Removed gap-x-3 gap-y-1
          customization.layout,
          className
        )}
        style={gapStyle} // Apply dynamic gap
      >
        {finalSvgContent ? (
          <SVGLogo
            svgContent={finalSvgContent}
            size={customization.iconSize}
            color={customization.color}
            className="leading-none"
          />
        ) : (
          <Icon
            size={customization.iconSize}
            color={customization.color}
            className="leading-none"
          />
        )}
        <p
          className="-mt-1"
          style={{
            ...customization.styles,
            color: customization.color,
            fontSize: `${customization.fontSize}px`,
          }}
        >
          {customization.name}
        </p>
      </figure>
    );
  }
);

type LogotypeBoxProps = {
  bgColor: string;
  className?: string;
  children: React.ReactNode;
};

const LogotypeBox: React.FC<LogotypeBoxProps> = ({
  bgColor,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full", // Ensures full width
        className
      )}
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
    </div>
  );
};

Logotype.displayName = "Logotype";

export { Logotype, LogotypeBox };
