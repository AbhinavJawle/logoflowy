import {
  FabricText,
  Group,
  loadSVGFromString,
  Rect,
  StaticCanvas,
  util,
} from "fabric";
import { Customization } from "@/app/(types)/logo";
import { layoutItems } from "@/app/(utils)/layout-items";

export async function createCanvas({
  customization,
  svgIcon,
}: {
  customization: Customization;
  svgIcon: string;
}) {
  const multiplier = 3; // scale

  const { layout, iconSize = 0, gap = 0, fontSize } = customization; // Get gap from customization, default to 10
  const text = buildText(customization);
  const icon = await buildIcon(svgIcon, iconSize);
  const canvas = new StaticCanvas("canvas");

  // Calculate canvas dimensions based on layout and elements
  let canvasWidth, canvasHeight;
  if (layout === "left" || layout === "right") {
    canvasWidth = icon.width + text.width + gap;
    canvasHeight = Math.max(icon.height, text.height);
  } else {
    // top or bottom
    canvasWidth = Math.max(icon.width, text.width);
    canvasHeight = icon.height + text.height + gap;
  }

  canvas.setDimensions({ width: canvasWidth, height: canvasHeight });

  // Position elements based on layout
  if (layout === "top") {
    icon.left = (canvasWidth - icon.width) / 2; // Center icon horizontally
    icon.top = 0;
    text.left = (canvasWidth - text.width) / 2; // Center text horizontally
    text.top = icon.height + gap;
  } else if (layout === "bottom") {
    text.left = (canvasWidth - text.width) / 2; // Center text horizontally
    text.top = 0;
    icon.left = (canvasWidth - icon.width) / 2; // Center icon horizontally
    icon.top = text.height + gap;
  } else if (layout === "left") {
    icon.left = 0;
    icon.top = (canvasHeight - icon.height) / 2; // Center icon vertically
    text.left = icon.width + gap;
    text.top = (canvasHeight - text.height) / 2; // Center text vertically
  } else {
    // right
    text.left = 0;
    text.top = (canvasHeight - text.height) / 2; // Center text vertically
    icon.left = text.width + gap;
    icon.top = (canvasHeight - icon.height) / 2; // Center icon vertically
  }

  // Add elements directly to canvas (no group needed for simple positioning)
  canvas.add(icon, text);
  canvas.renderAll();

  return canvas;
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// New function to get canvas data in specified format
export async function getCanvasData(
  canvas: StaticCanvas,
  format: "png" | "svg",
  customization: Customization, // Added customization to access font styles
  multiplier: number = 3
): Promise<string> {
  if (format === "png") {
    return canvas.toDataURL({ multiplier });
  } else {
    let svgString = canvas.toSVG();
    const { styles } = customization;

    if (styles?.fontFamily) {
      try {
        // Check if the font is a local font (exists in /public/fonts/)
        const localFontPath = `/fonts/${styles.fontFamily}.ttf`;
        // If the fontFamily matches a known local font, inject @font-face with local path
        // You may want to make this check more robust if you have multiple local fonts
        const isLocalFont = true; // Set to true if you want to always use local font for now
        if (isLocalFont) {
          const fontFaceRule = `\n            @font-face {\n              font-family: '${
            styles.fontFamily
          }';\n              font-style: normal;\n              font-weight: ${
            styles.fontWeight || "normal"
          };\n              src: url('${localFontPath}') format('truetype');\n            }\n          `;
          const defsRegex = /<defs>/;
          const styleTag = `<style type=\"text/css\"><![CDATA[${fontFaceRule}]]></style>`;
          if (defsRegex.test(svgString)) {
            svgString = svgString.replace(defsRegex, `<defs>${styleTag}`);
          } else {
            svgString = svgString.replace(
              /<svg[^>]*>/,
              `$&<defs>${styleTag}</defs>`
            );
          }
        } else {
          // 1. Construct Google Font CSS URL
          const fontFamilyQuery = `family=${styles.fontFamily.replaceAll(
            " ",
            "+"
          )}`;
          const query = styles.fontWeight
            ? `${fontFamilyQuery}:wght@${styles.fontWeight}`
            : fontFamilyQuery;
          const fontCssUrl = `https://fonts.googleapis.com/css2?${query}&display=swap`;

          // 2. Fetch the Google Font CSS
          const cssResponse = await fetch(fontCssUrl, {
            headers: {
              // Mimic a browser user agent to get WOFF2 URLs
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
          });
          if (!cssResponse.ok)
            throw new Error(
              `Failed to fetch font CSS: ${cssResponse.statusText}`
            );
          const cssText = await cssResponse.text();

          // 3. Extract the WOFF2 font URL from the CSS
          const fontUrlMatch = cssText.match(
            /src: url\((.*?)\) format\('woff2'\)/
          );
          if (!fontUrlMatch || !fontUrlMatch[1])
            throw new Error("Could not find WOFF2 URL in CSS");
          const fontUrl = fontUrlMatch[1];

          // 4. Fetch the font file (WOFF2)
          const fontResponse = await fetch(fontUrl);
          if (!fontResponse.ok)
            throw new Error(
              `Failed to fetch font file: ${fontResponse.statusText}`
            );
          const fontArrayBuffer = await fontResponse.arrayBuffer();

          // 5. Convert font file to Base64
          const base64FontData = arrayBufferToBase64(fontArrayBuffer);

          // 6. Create the @font-face rule
          const fontFaceRule = `\n            @font-face {\n              font-family: '${
            styles.fontFamily
          }';\n              font-style: normal; /* Assuming normal style, adjust if needed */\n              font-weight: ${
            styles.fontWeight || "normal"
          }; /* Use specified or default weight */\n              src: url(data:font/woff2;base64,${base64FontData}) format('woff2');\n            }\n          `;

          // 7. Inject the @font-face rule into the SVG
          const defsRegex = /<defs>/;
          const styleTag = `<style type=\"text/css\"><![CDATA[${fontFaceRule}]]></style>`;

          if (defsRegex.test(svgString)) {
            // Inject style into existing defs
            svgString = svgString.replace(defsRegex, `<defs>${styleTag}`);
          } else {
            // Inject defs with style after the opening svg tag
            svgString = svgString.replace(
              /<svg[^>]*>/,
              `$&<defs>${styleTag}</defs>`
            );
          }
        }
      } catch (error) {
        // Fallback: inject a style tag with the font-family only, so the SVG uses the specified font if available
        const fallbackFontFamily = styles.fontFamily
          ? styles.fontFamily
          : "sans-serif";
        const fallbackFontWeight = styles.fontWeight || "normal";
        const fallbackStyleTag = `<style type=\"text/css\"><![CDATA[\n          text { font-family: '${fallbackFontFamily}'; font-weight: ${fallbackFontWeight}; }\n        ]]></style>`;
        const defsRegex = /<defs>/;
        if (defsRegex.test(svgString)) {
          svgString = svgString.replace(defsRegex, `<defs>${fallbackStyleTag}`);
        } else {
          svgString = svgString.replace(
            /<svg[^>]*>/,
            `$&<defs>${fallbackStyleTag}</defs>`
          );
        }
      }
    }

    return svgString;
  }
}

async function buildIcon(svgIcon: string, iconSize: number) {
  const { objects }: any = await loadSVGFromString(svgIcon);
  const icon = util.groupSVGElements(objects);

  // Scale icon to fit iconSize while maintaining aspect ratio
  const scale = iconSize / Math.max(icon.width ?? 1, icon.height ?? 1);
  icon.scaleX = scale;
  icon.scaleY = scale;

  // Create a bounding box for positioning
  const box = new Rect({
    width: iconSize,
    height: iconSize,
    fill: "transparent",
  });

  // Center the scaled icon within the bounding box
  icon.left = (box.width! - icon.getScaledWidth()) / 2;
  icon.top = (box.height! - icon.getScaledHeight()) / 2;

  return new Group([box, icon], { width: iconSize, height: iconSize });
}

function buildText({ name, color, styles, fontSize }: Customization) {
  const text = new FabricText(name as string, {
    fontFamily: styles?.fontFamily,
    fontWeight: styles?.fontWeight,
    fontSize: fontSize as number, // Use fontSize from customization
    lineHeight: 1,
    fill: color,
    originX: "left",
    originY: "top",
  });

  // Remove margin hack, rely on group positioning
  const marginTopHack = -(Math.abs(styles?.marginTop as number) / 1.5) || 0;
  text.top = marginTopHack;

  const box = new Rect({
    width: text.width,
    height: text.height,
    fill: "transparent",
  });

  // Position text at top-left within its group
  text.left = 0;
  text.top = 0;

  return new Group([box, text], { width: text.width, height: text.height });
}
