import "@components/Backdrop/Backdrop";

import { html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

import { CTAElement } from "@components/CTAElement";

import styles from "./styles.css";

const TAG_NAME = "cta-modal";

@customElement(TAG_NAME)
export class CTAModalElement extends CTAElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  title = "";
  
  @property({ type: String })
  footer = "";

  close = () => {
    this.open = false;
  };

  protected willUpdate(): void {
    if (this.open) {
      this.classList.add("open");
    } else {
      this.classList.remove("open");
    }
  }

  render() {
    return html`${when(
      this.open,
      () => {
        return html`
          <cta-backdrop
            part="backdrop"
            open=${this.open}
            @click=${this.close}
          ></cta-backdrop>
          <div part="modal">
            <slot name="title">
                ${this.title}
            </slot>
            <slot>
            </slot>
            <slot name="footer">
                ${this.footer}
            </slot>
          </div>
        `;
      },
      () => {
        return nothing;
      }
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAModalElement;
  }
}
