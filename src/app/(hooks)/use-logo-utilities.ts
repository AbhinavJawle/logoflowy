import { layoutItems } from "@/app/(utils)/layout-items";
import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import type { Customization, Layout, Logo } from "@/app/(types)/logo";
import { downloadImage } from "@/lib/download-image";
import { createCanvasLogo } from "@/app/(utils)/create-canvas-logo";

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
    filename?: string
  ) => {
    const canvasUrl = await createCanvasLogo({ customization, svgIcon });
    downloadImage(canvasUrl, filename);
  };

  return {
    initCustomization: {
      iconName: undefined,
      styles,
    },
    downloadLogo,
    buildCustomization,
  };
}
