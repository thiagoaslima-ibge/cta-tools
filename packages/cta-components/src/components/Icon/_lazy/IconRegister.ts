import DOMPurify from "dompurify";
import { Result, ok, fail } from "thin-result";
import { UnreachableCaseError } from "ts-essentials";

import { IconName, iconsMap } from "./iconsMap";

enum IconFetchState {
  PENDING,
  COMPLETED,
  REJECTED
}

enum IconFetchResult {
  PENDING,
  SUCCESS,
  FAIL,
}

/**
 * Represents all icons registered
 * and it state (if it is being download or already "cached")
 */
type IconRegisterItem =
  | {
      iconName: IconName;
      iconId: string;
      iconUrl: string;
      promise: Promise<Result<IconData, Error>>;
      fecthState: IconFetchState.PENDING;
      fetchResult: IconFetchResult.PENDING;
    }
  | {
      iconName: IconName;
      fecthState: IconFetchState.DONE;
      fetchResult: IconFetchResult.FAIL;
    }
  | {
      iconName: IconName;
      iconId: string;
      iconUrl: string;
      iconMarkup: string;
      fecthState: IconFetchState.DONE;
      fetchResult: IconFetchResult.SUCCESS;
    };

export type IconData = { iconId: string; iconMarkup: string };

export class IconRegister {
  #icons = new Map<IconRegisterItem["iconName"], IconRegisterItem>();

  requestIcon(iconName: IconName): Promise<Result<IconData, Error>> {
    const icon = this.#icons.get(iconName);

    if (!icon) {
      return this.#fetchIcon(iconName);
    }

    if (icon.fecthState === IconFetchState.DONE) {
      if (icon.fetchResult === IconFetchResult.FAIL) {
        return Promise.reject(
          fail()
        );
      }

      return Promise.resolve(
        ok({
          iconId: icon.iconId,
          iconMarkup: icon.iconMarkup,
        })
      );
    }

    if (icon.fecthState === IconFetchState.PENDING) {
      return icon.promise
        .then((response) => {
          if (response.success) {
            return ok(response.data);
          } else {
            return fail(response.error);
          }
        })
        .catch((err) => {
          return fail(err);
        });
    }

    throw new UnreachableCaseError(icon);
  }

  #registerIcon(props: {
    iconName: IconName;
    iconId: string;
    iconUrl: string;
    promise: Promise<Result<IconData, Error>>;
  }) {
    const { iconName, iconId, iconUrl, promise } = props;

    this.#icons.set(iconName, {
      iconId,
      iconName,
      iconUrl,
      promise,
      fecthState: IconFetchState.PENDING,
      fetchResult: IconFetchResult.PENDING,
    });
  }

  #saveIconFetchResponse(iconName: IconName, response: string | Error): void {
    if (this.#icons.has(iconName)) {
      const isString = typeof response === "string";
      const iconItem = this.#icons.get(iconName)!;

      if (iconItem.fecthState === IconFetchState.PENDING) {
        const item = isString
          ? ({
              iconName,
              iconId: iconItem.iconId,
              iconUrl: iconItem.iconUrl,
              iconMarkup: response,
              fecthState: IconFetchState.DONE,
              fetchResult: IconFetchResult.SUCCESS,
            } as const)
          : ({
              iconName,
              iconUrl: iconItem.iconUrl,
              fecthState: IconFetchState.DONE,
              fetchResult: IconFetchResult.FAIL,
              reason: Error,
            } as const);

        this.#icons.set(iconName, item);
      }
    }
  }

  #fetchIcon(iconName: IconName): Promise<Result<IconData, Error>> {
    const icon = iconsMap[iconName];
    const promise = globalThis
      .fetch(icon.path)
      .then((response) => response.text())
      .then((text) =>
        DOMPurify.sanitize(text, {
          USE_PROFILES: { svg: true, svgFilters: true },
        })
      )
      .then((sanitizedIcon) => {
        this.#saveIconFetchResponse(iconName, sanitizedIcon);
        return ok({
          iconId: icon.id,
          iconMarkup: sanitizedIcon,
        });
      })
      .catch((err: Error) => {
        this.#saveIconFetchResponse(iconName, err);
        return fail(err);
      });

    this.#registerIcon({
      iconName,
      iconId: icon.id,
      iconUrl: icon.path,
      promise,
    });

    return promise;
  }
}

export const iconRegister = new IconRegister();
