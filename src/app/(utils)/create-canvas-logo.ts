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

export async function createCanvasLogo({
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

  if (layout === "left" || layout === "right") {
    // Use gap for horizontal layouts
    canvas.width = iconSize + text.width + gap;
    canvas.height = Math.max(iconSize, text.height); // Adjust height based on taller element
    canvas.centerObjectV(icon);
    canvas.centerObjectV(text);
  } else {
    // Use gap for vertical layouts
    canvas.width = Math.max(iconSize, text.width); // Adjust width based on wider element
    canvas.height = iconSize + text.height + gap;
    canvas.centerObjectH(icon);
    canvas.centerObjectH(text);
  }

  if (layout === layoutItems.top) {
    icon.top = 0;
    text.top = iconSize + gap;
  }

  if (layout === layoutItems.right) {
    text.left = 0;
    icon.left = text.width + gap;
  }

  if (layout === layoutItems.bottom) {
    text.top = 0;
    icon.top = text.height + gap;
  }

  if (layout === layoutItems.left) {
    icon.left = 0;
    text.left = iconSize + gap;
  }

  const group = new Group([text, icon]);

  // Center the group on the canvas
  canvas.centerObject(group);

  canvas.add(group);
  canvas.renderAll();

  return canvas.toDataURL({ multiplier });
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
