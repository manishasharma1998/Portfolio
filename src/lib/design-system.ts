import data from "../../content/design-system.json";

export type DesignSystemContent = typeof data;

export function getDesignSystem(): DesignSystemContent {
  return data;
}
