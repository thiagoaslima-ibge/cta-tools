import { Result } from "thin-result";
import { IconData, IconRegister } from './IconRegister';
import { IconName } from './iconsMap';
declare type EventMap = {
    iconLoad: (iconProps: {
        iconId: string;
        iconMarkup: string;
    }) => void;
    iconFailed: (err: Error) => void;
};
declare class IconService {
    #private;
    constructor(register: IconRegister);
    onIconLoad(listener: EventMap['iconLoad']): VoidFunction;
    loadIcon(iconName: IconName, callback?: EventMap['iconLoad']): Promise<Result<IconData, Error>>;
}
export declare const iconService: IconService;
export {};
//# sourceMappingURL=IconService.d.ts.map