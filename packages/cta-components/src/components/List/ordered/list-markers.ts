export type OrderedListMarkerType = typeof ORDERED_LIST_MARKER_TYPES[number];

export const ORDERED_LIST_MARKER_TYPES = [
  "numeric",
  "uppercase-letters",
  "lowercase-letters",
  "uppercase-roman",
  "lowercase-roman",
] as const;

export const DEFAULT_ORDERED_LIST_MARKER_TYPE = "numeric";

export function isOrderedListMarkerType(value: unknown): value is OrderedListMarkerType {
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

const classNameMap: Record<OrderedListMarkerType, string> = {
  numeric: "cta__ordered-list__numeric-marker",
  "lowercase-letters": "cta__ordered-list__lowercase-letters-marker",
  "uppercase-letters": "cta__ordered-list__uppercase-letters-marker",
  "lowercase-roman": "cta__ordered-list__lowercase-roman-marker",
  "uppercase-roman": "cta__ordered-list__uppercase-roman-marker",
};

export function getMarkerClassname(markerType: string): string {
  if (isOrderedListMarkerType(markerType)) {
    return classNameMap[markerType];
  }
  return classNameMap[DEFAULT_ORDERED_LIST_MARKER_TYPE];
}

export function getAllMarkerClassnames(): string[] {
  return Object.values(classNameMap);
}
