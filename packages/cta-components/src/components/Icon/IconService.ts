import DOMPurify from "dompurify";
import isUndefined from "lodash/isUndefined";

type IconFetchOptions = { retry: false } | { retry?: true; maxRetries: number };

DOMPurify.addHook("afterSanitizeAttributes", function (node) {
  // Fix namespaces added by Adobe Illustrator
  node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  node.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  node.setAttribute("cta-svg-icon", "");
  node.setAttribute("part", "svg");
});

class IconFetch {
  #url: string;
  #promise: Promise<string>;
  #state: "fetching" | "fulfilled" | "failed";
  #result: {
    success?: string;
    error?: unknown;
  } = {};

  #retries = {
    running: false,
    enabled: true,
    maximum: 5,
    runs: 0,
  };

  mayRetry() {
    return this.#retries.enabled && this.#retries.runs < this.#retries.maximum;
  }

  get fetching() {
    return this.#state === "fetching" || this.#retries.running;
  }

  get fulfilled() {
    return this.#state === "fulfilled" && !this.#retries.running;
  }

  get failed() {
    return this.#state === "failed" && !this.#retries.running;
  }

  constructor(url: string, options: IconFetchOptions = { maxRetries: 5 }) {
    this.#url = url;
    this.#retries = {
      running: false,
      enabled:
        options.retry !== false &&
        !isUndefined(options.maxRetries) &&
        options.maxRetries > 0,
      maximum: options.retry !== false ? options.maxRetries : 0,
      runs: 0,
    };

    this.#state = "fetching";
    this.#promise = this.#startFetching();
  }

  #startFetching(): Promise<string> {
    return fetch(this.#url, {
      mode: "cors",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Request for '${this.#url}' returned ${response.status} (${
              response.statusText
            })`
          );
        }
        return response.text();
      })
      .then((body) => {
        const bodyLower = body.toLowerCase().trim();

        if (!(bodyLower.startsWith("<svg") || bodyLower.startsWith("<?xml"))) {
          throw Error(`Resource '${this.#url}' returned an invalid SVG file`);
        }

        const sanitized = DOMPurify.sanitize(body);

        this.#state = "fulfilled";
        this.#result.success = sanitized;
        return sanitized;
      })
      .catch((error) => {
        this.#state = "failed";
        return this.#retry(error);
      })
      .finally(() => {
        this.#resetRetry();
      });
  }

  #resetRetry() {
    this.#retries.running = false;
    this.#retries.runs = 0;
  }

  #nextRetry() {
    this.#retries.running = true;
    this.#retries.runs += 1;
  }

  #retry(error: unknown): Promise<string> {
    if (this.mayRetry()) {
      this.#nextRetry();
      return this.#startFetching();
    }
    this.#result.error = error;
    throw error;
  }

  // eslint-disable-next-line no-unused-vars
  then(callback: (markup: string) => unknown) {
    if (this.fulfilled && this.#result.success) {
      return callback(this.#result.success);
    }

    return this.#promise.then(callback);
  }

  // eslint-disable-next-line no-unused-vars
  catch(callback: (error: unknown) => unknown) {
    if (this.failed) {
      return callback(this.#result.error);
    }

    return this.#promise.catch(callback);
  }
}

export class CTAIconService {
  static #instance: CTAIconService | null = null;
  static #iconsFolderPath = "";

  static get() {
    if (!this.#instance) {
      this.#instance = new CTAIconService();
    }

    return this.#instance;
  }

  #icons = new Map<string, IconFetch>();
  #scheduledIcons: VoidFunction[] = [];

  private constructor() {
    return CTAIconService.#instance ?? this;
  }

  setIconsPath(url: string) {
    CTAIconService.#iconsFolderPath = url;
    this.#scheduledIcons.forEach((fn) => fn());
    this.#scheduledIcons = [];
  }

  getIcon(iconName: string) {
    if (!CTAIconService.#iconsFolderPath) {
      return new Promise<string>((resolve) => {
        this.#scheduledIcons.push(() => {
          return this.getIcon(iconName).then(resolve);
        });
      });
    }

    if (this.#icons.has(iconName)) {
      return this.#icons.get(iconName) as IconFetch;
    }

    const url = `${CTAIconService.#iconsFolderPath}/${iconName}.svg`;
    const iconFetcher = new IconFetch(url);
    this.#icons.set(iconName, iconFetcher);
    return iconFetcher;
  }
}

export const iconService = CTAIconService.get();

// iconService.setIconsPath('http://127.0.0.1:5174/icons')
