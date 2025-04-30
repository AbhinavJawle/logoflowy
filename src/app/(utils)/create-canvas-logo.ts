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

// New function to get canvas data in specified format
export async function getCanvasData(
  canvas: StaticCanvas,
  format: "png" | "svg",
  multiplier: number = 3
): Promise<string> {
  if (format === "png") {
    return canvas.toDataURL({ multiplier });
  } else {
    // Ensure fonts are embedded for SVG export if possible
    // Note: Fabric's default toSVG might not embed fonts perfectly depending on setup.
    // Additional logic might be needed for robust font embedding.
    return canvas.toSVG();
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
