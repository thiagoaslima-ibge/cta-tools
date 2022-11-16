import { Result } from "thin-result";
import { IconData } from './iconsMap';
declare class IconSyncService {
    #private;
    getIcon(iconName: string): Result<IconData, Error>;
}
export declare const iconSyncService: IconSyncService;
export {};
//# sourceMappingURL=IconService.d.ts.map