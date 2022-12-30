export type UnorderedListMarkerType = typeof UNORDERED_LIST_MARKER_TYPES[number];

export const UNORDERED_LIST_MARKER_TYPES = ["disc", "circle", "square"] as const;

export const DEFAULT_UNORDERED_LIST_MARKER_TYPE = "square";

export function isUnorderedListMarkerType(value: unknown): value is UnorderedListMarkerType {
  if (typeof value !== 'string') {
    return false;
  }

  for (const type of UNORDERED_LIST_MARKER_TYPES) {
    if (value === type) {
      return true;
    }
  }
  
  return false;
}

const classNameMap = new Map([
  ["disc", 'cta__unordered-list__disc-marker'],
  ["circle", 'cta__unordered-list__circle-marker'],
  ["square", 'cta__unordered-list__square-marker'],
  ["__other__", 'cta__unordered-list__custom-marker']
]);


export function getMarkerClassname(markerType: string): string {
  if (classNameMap.has(markerType)) {
    return classNameMap.get(markerType)!;
  }
  return classNameMap.get("__other__")!
}

export function getAllMarkerClassnames(): string[] {
  const response = [];

  for (const classname of classNameMap.values()) {
    response.push(classname);
  }

  return response;
}
