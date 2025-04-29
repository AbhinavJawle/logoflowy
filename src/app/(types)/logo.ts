import { IconWeight } from "@phosphor-icons/react";

export type Layout = "top" | "right" | "bottom" | "left";
export interface Logo {
  id: string;
  iconName: string;
  styles: React.CSSProperties;
  customization?: Customization;
  svgContent?: string; // Added to store SVG content
  imageUrl?: string; // Added to store image URL
}

export interface Customization {
  name?: string;
  color: string;
  bgColor: string;
  layout: Layout;
  iconStyle: IconWeight;
  iconName?: string;
  iconSize?: number;
  styles?: React.CSSProperties;
  svgContent?: string; // Added to store SVG content
}
