export type UnorderedListMarkerType = typeof UNORDERED_LIST_MARKER_TYPES[number];

export const UNORDERED_LIST_MARKER_TYPES = ["disc", "circle", "square", "none"] as const;

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

const classNameMap = new Map<UnorderedListMarkerType, string>([
  ["disc", 'cta__unordered-list__disc-marker'],
  ["circle", 'cta__unordered-list__circle-marker'],
  ["square", 'cta__unordered-list__square-marker'],
  ["none", 'cta__unordered-list__no-marker'],
]);

const customMarkerClassname = 'cta__unordered-list__custom-marker';


export function getMarkerClassname(markerType: string): string {
  if (isUnorderedListMarkerType(markerType)) {
    const value = classNameMap.get(markerType);
    return value ?? ''
  }
  return customMarkerClassname;
}

export function getAllMarkerClassnames(): string[] {
  const response = [customMarkerClassname];

  for (const classname of classNameMap.values()) {
    response.push(classname);
  }

  return response;
}
