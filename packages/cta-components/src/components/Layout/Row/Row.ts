import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import { isNumericText } from "@lib/isNumericText";
import { CTALayoutElement } from "@components/Layout/Layout";

import styles from "./styles.css";

const TAG_NAME = "cta-row";

@customElement(TAG_NAME)
export class CTARowElement extends CTALayoutElement {
  static get styles() {
    return unsafeCSS(styles);
  }

  protected willUpdate(): void {
    const value = this.getSize();
    
    if (isNumericText(value)) {
        this.style.flexGrow = value;
    } else {
        this.style.height = value;
    }
  }

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTARowElement;
  }
}
