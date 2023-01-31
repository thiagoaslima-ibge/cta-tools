import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { CTAElement } from "@components/CTAElement";

import styles from "./styles.css";

const TAG_NAME = "cta-backdrop";

@customElement(TAG_NAME)
export class CTABackdropElement extends CTAElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  @property({ type: Boolean, reflect: true })
  open = false;

  close = () => {
    this.open = false;
  };

  // Turns shadow dom off
  protected createRenderRoot() {
    return this;
  }

  protected willUpdate(): void {
    const classname = 'backdrop-open';
    if (this.open) {
        this.classList.add(classname);
    } else {
        this.classList.remove(classname);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.close);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.close);
  }

  render() {
    if (!this.open) {
      return nothing;
    }

    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTABackdropElement;
  }
}
