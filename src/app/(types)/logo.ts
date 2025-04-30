import { IconWeight } from "@phosphor-icons/react";

export type Layout = "top" | "right" | "bottom" | "left";
export interface Logo {
  id: string;
  iconName: string;
  styles: React.CSSProperties;
  customization?: Customization;
  svgContent?: string;
  imageUrl?: string;
  companyName?: string;
}

export interface Customization {
  gap?: number;
  name?: string;
  color: string;
  bgColor: string;
  layout: Layout;
  iconSize?: number;
  fontSize?: number; // Added
  styles?: React.CSSProperties;
  svgContent?: string;
}
