import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import isString from "lodash/isString";

import { CTAElement } from "@components/CTAElement";
import styles from "./styles.css?inline";

const imagesSizes = ["sm", "md", "lg"] as const;
const DEFAULT_IMAGE_SIZE = "lg";
export type ImageSize = typeof imagesSizes[number];

function isValidImageSize(value: unknown): value is ImageSize {
  const _sizes: readonly string[] = imagesSizes;
  return isString(value) && _sizes.includes(value);
}

const roleConverter = {
  fromAttribute: (value: string | null): string => {
    return value?.trim() || '';
  },
  toAttribute: (value: string): string | null => {
    return value.trim() || null;
  },
};

const TAG_NAME = "cta-image";

@customElement(TAG_NAME)
export class CTAImageElement extends CTAElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  @property({ type: String, reflect: true })
  src = "";

  @property({ type: String, reflect: true })
  sizes?: string;

  @property({ type: String, reflect: true })
  srcset?: string;

  @property({ type: String, reflect: true })
  alt?: string;
  
  @property({ type: Boolean, attribute: 'no-alt', reflect: true })
  noAlt = false;
  
  @property({ type: String, reflect: true, converter: roleConverter })
  role = '';

  @property({ type: String })
  width?: string;

  @property({ type: String })
  height?: string;

  @property({
    type: String,
    converter: {
      fromAttribute: (value: string | null): ImageSize => {
        const _val = value?.trim();
        return isValidImageSize(_val) ? _val : DEFAULT_IMAGE_SIZE;
      },
      toAttribute: (value: ImageSize): ImageSize => {
        return value;
      },
    },
  })
  defaultSize: ImageSize = "lg";

  connectedCallback() {
    if (!this.hasAttribute("alt") && !this.hasAttribute('no-alt')) {
      console.error(`The img ${this.src ?? this.id} has no alt property. Either add it or seta no-alt property on the component.`);
    }
    super.connectedCallback();
  }

  protected willUpdate(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('no-alt')) {
      if (this.noAlt) {
        this.alt = '';
        this.role = 'presentation';
      } else {
        this.role = '';
      }
    }
    
    if (changedProperties.has('alt')) {
      if (this.alt) {
        this.noAlt = false;
        this.role = '';
        this.removeAttribute('no-alt');
      }
    }
  }

  updated() {
    if (!this.hasAttribute("alt") && !this.hasAttribute('no-alt')) {
      this.classList.add('invalid');
    } else {
      this.classList.remove('invalid');
    }
  }

  render() {
    return html`
      <img
        part="image"
        alt=${ifDefined(this.alt)}
        width=${ifDefined(this.width)}
        height=${ifDefined(this.height)}
        srcset=${ifDefined(this.srcset)}
        sizes=${ifDefined(this.sizes)}
        src=${this.src}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAImageElement;
  }
}
