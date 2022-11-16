import { fail, ok, Result } from "thin-result";

import { IconData, iconsMap } from './iconsMap';

class IconSyncService {
  #icons = iconsMap;

  getIcon(iconName: string): Result<IconData, Error> {
    // @ts-expect-error iconName variable is broader than the keys of this.#icons
    const icon = this.#icons[iconName];
   return icon ? ok(icon) : fail(new Error(`icon ${iconName} not found`));
  }
}

export const iconSyncService = new IconSyncService();
