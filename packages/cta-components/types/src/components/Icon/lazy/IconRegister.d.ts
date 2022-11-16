import { Result } from "thin-result";
import { IconName } from "./iconsMap";
export declare type IconData = {
    iconId: string;
    iconMarkup: string;
};
export declare class IconRegister {
    #private;
    requestIcon(iconName: IconName): Promise<Result<IconData, Error>>;
}
export declare const iconRegister: IconRegister;
//# sourceMappingURL=IconRegister.d.ts.map