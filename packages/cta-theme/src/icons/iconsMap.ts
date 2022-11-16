import { iconUrlList } from "./iconsList";

export type IconName = keyof typeof iconUrlList;

const _iconsMap: Record<IconName, { path: string; id: string }> = Object.create(null);

const keys = Object.keys(iconUrlList) as IconName[];

for (const prop of keys) {
  _iconsMap[prop] = Object.freeze({
    id: iconUrlList[prop].id,
    path: iconUrlList[prop].path,
  });
}

export const iconsMap = Object.freeze(_iconsMap);
