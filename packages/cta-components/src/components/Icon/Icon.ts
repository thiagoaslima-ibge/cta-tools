import { CTAElement } from "@components/CTAElement";
import { nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { when } from "lit/directives/when.js";
import isString from "lodash/isString";

import { CTAIconServiceController } from "./CTAIconServiceController";
import styles from './styles.css?inline';

const TAG_NAME = 'cta-icon';

const STYLE_PROPERTIES = [
  'fill',
  'width',
  'height',
];

@customElement(TAG_NAME)
export class CTAIconElement extends CTAElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  @property({ type: String })
  name = "";

  @property({ type: String })
  width = "1em";
  
  @property({ type: String })
  height = "1em";
  
  @property({ type: String })
  fill = "inherit";

  @state()
  iconMarkup?: string;

  
  constructor() {
    super();
    new CTAIconServiceController(this);
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    for (const prop of STYLE_PROPERTIES) {
      if (changedProperties.has(prop)) {
        // @ts-expect-error prop exists on style and on the component
        this.style[prop] = this[prop];
      }
    }
  }

  render() {
    return when(
      isString(this.iconMarkup),
      () => unsafeSVG(this.iconMarkup),
      () => nothing
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAIconElement;
  }
}
