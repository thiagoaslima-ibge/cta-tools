import { html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import { when } from "lit/directives/when.js";
import { isString } from "lodash";
import { CTAIconServiceController } from "./controllers/CTAIconServiceController";

const TAG_NAME = 'cta-icon-2';

@customElement(TAG_NAME)
export class CtaIconElement extends LitElement {
  @property({ type: String })
  id = "";

  @property({ type: String })
  name = "";

  @state()
  private iconService = new CTAIconServiceController(this);

  @state()
  iconMarkup?: string | Promise<string>;

  willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has("name")) {
    }
  }

  render() {

    return when(
      isString(this.iconMarkup),
      () => html`${this.iconMarkup}`,
      () => until(this.iconMarkup, nothing)
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CtaIconElement;
  }
}
