export type OListMarkerType = typeof ORDERED_LIST_MARKER_TYPES[number];

export const ORDERED_LIST_MARKER_TYPES = [
  "numeric",
  "uppercase-letters",
  "lowercase-letters",
  "uppercase-roman",
  "lowercase-roman",
] as const;

export const DEFAULT_ORDERED_LIST_MARKER_TYPE = "numeric";

export function isOrderedListMarkerType(value: unknown): value is OListMarkerType {
  if (typeof value !== 'string') {
    return false;
  }

  for (const type of ORDERED_LIST_MARKER_TYPES) {
    if (value === type) {
      return true;
    }
  }
  
  return false;
}

const olTypeMap: Record<OListMarkerType, HTMLOListElement["type"]> = {
  numeric: "1",
  "lowercase-letters": "a",
  "uppercase-letters": "A",
  "lowercase-roman": "i",
  "uppercase-roman": "I",
};

export function getHTMLOListElementType(type: string): HTMLOListElement["type"] {
  if (isOrderedListMarkerType(type)) {
    return olTypeMap[type];
  }
  return olTypeMap[DEFAULT_ORDERED_LIST_MARKER_TYPE];
}