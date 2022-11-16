import { svg, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { iconService } from "./iconService";

const TAG_NAME = "cta-icons-sprite";

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: IconSprite;
  }
}

@customElement(TAG_NAME)
export class IconSprite extends LitElement {
  #unsubscribe: VoidFunction = () => {};
  #symbols: { id: string; markup: string }[] = [];

  // This element renders the svg in the "light" dom
  // So the icons may be reused throughout the content
  createRenderRoot() {
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.#unsubscribe = iconService.onIconLoad((iconProps) => {
      this.#registerSymbol(iconProps)
    });

    setTimeout(() => {
      iconService.loadIcon('close-circle', (props) => console.log('loaded', props))
    }, 2000)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unsubscribe();
  }

  #registerSymbol(iconProps: { iconId: string; iconMarkup: string }) {
    const markup = this.#convertSvgToSymbol(iconProps.iconMarkup);
    this.#symbols.push({ id: iconProps.iconId, markup });
    this.requestUpdate();
  }

  #convertSvgToSymbol(iconMarkup: string) {
    return iconMarkup.replace("<svg", "<symbol").replace("</svg", "</symbol");
  }

  render() {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg">
        ${repeat(
          this.#symbols,
          (symbol) => symbol.id,
          (symbol) => unsafeSVG(symbol.markup)
        )}
      </svg>
    `;
  }
}
