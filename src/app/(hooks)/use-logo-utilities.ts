import { layoutItems } from "@/app/(utils)/layout-items";
import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import type { Customization, Layout, Logo } from "@/app/(types)/logo";
import { downloadImage, downloadSvg } from "@/lib/download-image";
import { createCanvas, getCanvasData } from "@/app/(utils)/create-canvas-logo";

export function useLogoUtilities() {
  const name = useLogoStore((state) => state.name);
  const color = useLogoStore((state) => state.color);
  const bgColor = useLogoStore((state) => state.bgColor);
  const layout = useLogoStore((state) => state.layout);
  // const iconStyle = useLogoStore((state) => state.iconStyle);
  const iconSize = useLogoStore((state) => state.iconSize);
  const fontSize = useLogoStore((state) => state.fontSize); // Added
  // const iconName = useLogoStore((state) => state.iconName);
  const styles = useLogoStore((state) => state.styles);
  const gap = useLogoStore((state) => state.gap || 0);

  const buildCustomization = (
    logo: Logo,
    companyName?: string,
    svgContent?: string
  ): Customization => {
    // Prioritize passed companyName, then logo.companyName, then Zustand name, then default
    const finalName = companyName || logo.companyName || name || "dummylogo";
    // Prioritize passed svgContent, then logo.svgContent
    const finalSvgContent = svgContent || logo.svgContent;

    return {
      name: finalName,
      layout: layout,
      styles: styles || logo.styles,
      color,
      bgColor,
      iconSize,
      fontSize,
      gap,
      svgContent: finalSvgContent, // Include the determined SVG content
    };
  };

  const downloadLogo = async (
    customization: Customization,
    svgIcon: string,
    filename?: string,
    format: "png" | "svg" = "png" // Default to png
  ) => {
    const canvas = await createCanvas({ customization, svgIcon });
    // Pass customization to getCanvasData for font embedding
    const data = await getCanvasData(canvas, format, customization);
    //my attempt
    const svgContent = canvas.toSVG();

    if (format === "png") {
      downloadImage(data, filename);
    } else {
      // downloadSvg(data, filename);
      downloadSvg(svgContent, filename);
    }
  };

  return {
    initCustomization: {
      iconName: undefined,
      styles,
    },
    downloadLogo, // This function now handles both PNG and SVG
    buildCustomization,
  };
}
