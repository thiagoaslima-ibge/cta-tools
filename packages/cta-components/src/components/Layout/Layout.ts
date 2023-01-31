import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { isUndefined } from "lodash";

import { mediaQueries, type MediaQuery } from "@lib/getCurrentMediaQuery";
import { CTAElement } from "@components/CTAElement";
import { WindowResizeController } from "@controllers/WindowResizeController";

export class CTALayoutElement extends CTAElement {
  @property({ type: String })
  xs?: string;

  @property({ type: String })
  sm?: string;

  @property({ type: String })
  md?: string;

  @property({ type: String })
  lg?: string;

  @state()
  currentMediaQuery: MediaQuery = "md";

  constructor() {
    super();
    new WindowResizeController(this, ({ mediaQuery }) => {
      this.currentMediaQuery = mediaQuery;
    });
  }

  protected getSize(): string {
    let index = mediaQueries.findIndex((mq) => mq === this.currentMediaQuery);
    while (index >= 0) {
        const property = mediaQueries[index];
        if (!isUndefined(this[property])) {
            return String(this[property]);
        }
        index -= 1;
    }
    return String(1);
  }

  // Turns shadow dom off
  protected createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }
}
