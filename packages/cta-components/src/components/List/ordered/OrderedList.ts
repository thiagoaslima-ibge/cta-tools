import { CSSResultArray, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from './ordered-list.css';

const TAG_NAME = "cta-ordered-list";

const ORDER_SYMBOLS = ['numeric', 'uppercase-letters', 'lowercase-letters'] as const;
const DEFAULT_ORDER_SYMBOL = 'numeric';
type OrderSymbol = typeof ORDER_SYMBOLS[number];

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: OrderedListElement;
  }
}

export interface OrderedListElement extends HTMLElement {
  type: 'ordered';
  symbol: OrderSymbol;
}

@customElement(TAG_NAME)
export class OrderedList extends LitElement {
  static styles = [styles] as unknown as CSSResultArray;

  @property({ type: String, reflect: true })
  get type() {
    return 'ordered';
  }

  @property({ type: String })
  symbol = DEFAULT_ORDER_SYMBOL;

  @property({ type: String, attribute: true, reflect: true })
  id = "";

  @property({ type: String, attribute: "data-testid", reflect: true })
  dataTestId = "";

  render() {
    return html`
      <ol part="list">
        <slot></slot>
      </ol>
    `
  }
}
