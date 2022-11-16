import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { IconName } from "./iconsMap";
import { iconSyncService } from "./IconService";

const TAG_NAME = "cta-icon";

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
export class Icon extends LitElement {
  #iconService = iconSyncService;
  #iconName: IconName | "" = "";
  #iconMarkup = "";

  static styles = css`
    :host {
      display: block;
    }

    :host([inline]) {
      display: inline-block;
      vertical-align: middle;
    }
  `

  @property({ type: Boolean, reflect: true })
  inline = false;

  @property({ type: String, attribute: true, reflect: true })
  id = "";

  @property({ type: String, attribute: "data-testid", reflect: true })
  dataTestId = "";

  @property({ type: String, reflect: true })
  get name(): IconName | "" {
    return this.#iconName;
  }

  set name(iconName: IconName | "") {
    if (this.#iconName !== iconName) {
      const oldValue = this.#iconName;
      this.#iconName = iconName;
      this.#updateIcon(iconName);
      this.requestUpdate("name", oldValue);
    }
  }

  #resetIcon() {
    this.#setId("");
    this.#setDataTestId("");
    this.#iconMarkup = "";
  }

  #setId(value: string) {
    const oldValue = this.id;
    this.id = Boolean(value) ? `${value}-icon` : "";
    this.requestUpdate("id", oldValue);
  }

  #setDataTestId(value: string) {
    const oldValue = this.dataTestId;
    this.dataTestId = Boolean(value) ? `${value}-icon` : "";
    this.requestUpdate("data-testid", oldValue);
  }

  #updateIcon(iconName: IconName | "") {
    const iconResult = this.#iconService.getIcon(iconName);

    if (!iconResult.success) {
      return this.#resetIcon();
    }

    const { id, markup } = iconResult.data;

    this.#setId(id);
    this.#setDataTestId(id);
    this.#iconMarkup = markup;
  }

  render() {
    return unsafeSVG(this.#iconMarkup);
  }
}
