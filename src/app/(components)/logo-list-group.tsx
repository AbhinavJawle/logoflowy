"use client";
import { LogoItem } from "@/app/(components)/logo-item";
import { Logotype, LogotypeBox } from "@/app/(components)/logotype";
import { useLogoUtilities } from "@/app/(hooks)/use-logo-utilities";
import { useLogoStore } from "@/app/(hooks)/use-logo-store";
import type { Customization, Logo } from "@/app/(types)/logo";
import { renderToString } from "react-dom/server";
import * as icons from "@/app/(utils)/icons";
import Image from "next/image";
import { layoutItems } from "@/app/(utils)/layout-items";

// Function to resize SVG content to match the icon size
const resizeSvg = (svgContent: string, size: number): string => {
  try {
    // Create a temporary DOM element to parse the SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = doc.querySelector("svg");

    if (svgElement) {
      // Preserve the viewBox if it exists
      const viewBox = svgElement.getAttribute("viewBox");

      // Set fixed width and height
      svgElement.setAttribute("width", `${size}px`);
      svgElement.setAttribute("height", `${size}px`);

      // Make sure we keep the viewBox for proper scaling
      if (!viewBox) {
        // If no viewBox, create one based on original dimensions
        const originalWidth = svgElement.getAttribute("width") || "24";
        const originalHeight = svgElement.getAttribute("height") || "24";
        svgElement.setAttribute(
          "viewBox",
          `0 0 ${originalWidth.replace(/px$/, "")} ${originalHeight.replace(
            /px$/,
            ""
          )}`
        );
      }

      // Convert back to string
      return new XMLSerializer().serializeToString(svgElement);
    }
  } catch (error) {
    console.error("Error resizing SVG:", error);
  }

  return `<svg width="${size}px" height="${size}px" viewBox="0 0 24 24"><rect width="100%" height="100%" fill="currentColor"/></svg>`; // Return fallback if parsing failed
};

export const LogoListGroup = ({ items, companyName }: { items: Logo[], companyName?: string }) => {
  const { initCustomization, buildCustomization, downloadLogo } =
    useLogoUtilities();

  const setStyles = useLogoStore((state) => state.setStyles);

  const handleSetFont = (
    isFontSelected: boolean,
    styles: React.CSSProperties
  ) => {
    if (isFontSelected) {
      setStyles();
      return;
    }
    setStyles(styles);
  };

  const handleDownloadLogo = async (
    customization: Customization,
    Icon: React.ComponentType<any>,
    filename: string
  ) => {
    let svgIcon;
    if (customization.svgContent) {
      // Use the SVG content directly if available
      svgIcon = customization.svgContent;
    } else {
      // Fall back to Phosphor icon if no SVG content
      svgIcon = renderToString(
        <Icon
          color={customization.color}
          size={customization.iconSize}
        />
      );
    }
    await downloadLogo(customization, svgIcon, filename);
  };

  // Determine container classes based on item count
  const containerClasses = items.length === 1 
    ? "-mt-[1px]" // No grid for single item, just margin if needed
    : "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 -mt-[1px]"; // Grid for multiple items

  return (
    <div className={containerClasses}>
      {items.map((item: Logo) => {
        const customization = buildCustomization(item);
        // Pass SVG content from item to customization if available
        if (item.svgContent) {
          customization.svgContent = item.svgContent;
        }
        const isFontSelected =
          initCustomization.styles?.fontFamily === item.styles.fontFamily;
        const Icon = icons[item.iconName as keyof typeof icons];
        return (
          <LogoItem
            key={item.id}
            isFontSelected={isFontSelected}
            onSetFont={() => handleSetFont(isFontSelected, item.styles)}
            onLogoDownload={() =>
              handleDownloadLogo(customization, Icon, item.id)
            }
            {...item}
          >
            <LogotypeBox bgColor={customization.bgColor}>
              {item.imageUrl ? (
                <div className="flex items-center justify-center h-full w-full">
                  <div className={`flex items-center gap-y-0 ${layoutItems[customization.layout]}`}>
                    <div
                      className="relative"
                      style={{
                        width: `${
                          customization.iconSize
                            ? customization.iconSize * 3
                            : 96
                        }px`,
                        height: `${
                          customization.iconSize
                            ? customization.iconSize * 3
                            : 96
                        }px`,
                      }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt="AI Logo"
                        fill
                        style={{ objectFit: "contain" }}
                        className="leading-none"
                      />
                    </div>
                    <p
                      className="mt-0"
                      style={{
                        ...customization.styles,
                        color: customization.color,
                        marginTop: "-10px",
                        paddingTop: "0",
                        lineHeight: "1",
                      }}
                    >
                      {companyName || customization.name || "dummylogo"}
                    </p>
                  </div>
                </div>
              ) : (
                <Logotype customization={customization!} icon={Icon} />
              )}
            </LogotypeBox>
          </LogoItem>
        );
      })}
    </div>
  );
};
