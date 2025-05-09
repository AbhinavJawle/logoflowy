"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import type { Logo } from "@/app/(types)/logo";
import Link from "next/link";
import {
  ArrowRight,
  CheckSquare,
  Copy,
  DownloadSimple,
  PhosphorLogo,
  Square,
} from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/app/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { BASE_URL } from "@/lib/config";

type LogoItemProps = {
  isFontSelected: boolean;
  onSetFont: () => void;
  onLogoDownload: (format: "png" | "svg") => void; // Accept format
} & Logo &
  React.HTMLAttributes<HTMLDivElement>;

const LogoItem: React.FC<LogoItemProps> = React.memo(
  ({
    id,
    iconName,
    styles,
    svgContent,
    onSetFont,
    onLogoDownload,
    children,
  }) => {
    const { copyToClipboard } = useCopyToClipboard();
    return (
      <div className="h-96 w-200 max-w-svw flex flex-row relative text-muted-foreground hover:text-foreground bg-transparent shadow-2xl rounded-xl transition-all duration-200">
        <div className="flex-grow p-2 flex-col items-center justify-center">
          {children}
          <Button
            variant="ghost"
            onClick={() => onLogoDownload("png")} // Pass 'png'
            title={`Download PNG of your custom logo created with ${iconName} + ${styles.fontFamily}`}
          >
            Download Png
          </Button>

          <Button
            variant="ghost"
            onClick={() => onLogoDownload("svg")} // Pass 'svg'
            title={`Download SVG of your custom logo created with ${iconName} + ${styles.fontFamily}`}
          >
            Download Svg
          </Button>
        </div>
      </div>
    );
  }
);

LogoItem.displayName = "LogoItem";

export { LogoItem };
