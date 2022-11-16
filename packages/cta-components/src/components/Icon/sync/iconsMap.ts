import chevronDownIconSvg from "../../../assets/icons/chevron-down.svg?raw";
import closeCircleIconSvg from "../../../assets/icons/close-circle.svg?raw";

export const iconsMap = {
	'chevron-down': {
		id: 'chevron-down',
		markup: chevronDownIconSvg,
	},
	'close-circle': {
		id: 'close-circle',
		markup: closeCircleIconSvg,
	},
} as const;

export type IconName = keyof typeof iconsMap;
export type IconData = typeof iconsMap[IconName];
