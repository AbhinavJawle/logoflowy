"use client";
import * as React from "react";
import { Customization } from "@/app/(types)/logo";
import { cn } from "@/lib/utils";
import { SVGLogo } from "./svg-logo";

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
    
    return (
      <figure
        className={cn(
          "flex items-center gap-x-3 gap-y-1",
          customization.layout,
          className
        )}
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
            weight={customization.iconStyle}
            size={customization.iconSize}
            color={customization.color}
            className="leading-none"
          />
        )}
        <p
          className="-mt-1"
          style={{ ...customization.styles, color: customization.color }}
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
        "flex items-center justify-center w-full h-full rounded-md",
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
