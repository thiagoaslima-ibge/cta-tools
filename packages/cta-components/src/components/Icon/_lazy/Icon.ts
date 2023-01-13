import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { IconName } from "./iconsMap";
import { iconService } from "./IconService";

const TAG_NAME = "cta-async-icon";

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: IconElement;
  }
}

export interface IconElement extends HTMLElement {
  /** The svg icon id */
  name: IconName;
  /**
   * The icon is used inline or as a block element
   * @default false
   */
  inline?: boolean;
  /** CSS class to be applied directly on the svg element */
  class?: string;
}

@customElement(TAG_NAME)
export class CTAIcon extends LitElement {
  #iconName: IconName | "" = "";
  #iconMarkup = "";
  #unsubscribe: VoidFunction = () => {};

  @property({ type: String, attribute: true, reflect: true })
  id = "";

  @property({ type: String, attribute: "data-testid", reflect: true })
  dataTestId = "";

  @property({ type: String, reflect: true })
  get name(): IconName | "" {
    return this.#iconName;
  }

  set name(iconName: IconName | "") {
    if (iconName === "") {
      this.#iconName = '';
      this.#resetIcon();
      return;
    }

    if (this.#iconName !== iconName) {
      const oldValue = this.#iconName;
      this.#iconName = iconName;
      iconService.loadIcon(iconName);
      this.requestUpdate("name", oldValue);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#unsubscribe = iconService.onIconLoad((iconProps) => {
      this.#updateIcon(iconProps);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unsubscribe();
  }

  #resetIcon() {
    this.#setId("");
    this.#setDataTestId('');
    this.#iconMarkup = "";
  }

  #setId(value: string) {
    const oldValue = this.id;
    this.id = Boolean(value) ? `${value}-icon` : '';
    this.requestUpdate("id", oldValue);
  }

  #setDataTestId(value: string) {
    const oldValue = this.dataTestId;
    this.dataTestId = Boolean(value) ? `${value}-icon` : '';
    this.requestUpdate("data-testid", oldValue);
  }

  #updateIcon(iconProps: { iconId: string; iconMarkup: string }) {
    this.#setId(iconProps.iconId);
    this.#setDataTestId(iconProps.iconId);
    this.#iconMarkup = iconProps.iconMarkup;
  }

  render() {
    return unsafeSVG(this.#iconMarkup);
  }
}
