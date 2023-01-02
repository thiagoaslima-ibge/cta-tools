import { html, LitElement, unsafeCSS } from "lit";
import {
  property,
  customElement,
  queryAssignedElements,
} from "lit/decorators.js";
import {
  DEFAULT_ORDERED_LIST_MARKER_TYPE,
  type OrderedListMarkerType,
  isOrderedListMarkerType,
  getAllMarkerClassnames,
  getMarkerClassname,
} from "./list-markers";
import styles from "./ordered-list.css";

const TAG_NAME = "cta-ordered-list";
const LIST_CLASSNAME = "cta__ordered-list";

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAOrderedListElement;
  }
}

export interface CTAOrderedListElement
  extends Omit<HTMLOListElement, "reversed" | "start" | "type"> {
  "data-testid"?: string;
  type?: OrderedListMarkerType;
  start?: number;
  "keep-parent-counter"?: boolean;
}

@customElement(TAG_NAME)
export class CTAOrderedList extends LitElement {
  static styles = unsafeCSS(styles);

  @property({
    type: String,
    reflect: true,
    converter(value: unknown): OrderedListMarkerType {
      if (isOrderedListMarkerType(value)) {
        return value;
      }
      return DEFAULT_ORDERED_LIST_MARKER_TYPE;
    },
  })
  type: OrderedListMarkerType = DEFAULT_ORDERED_LIST_MARKER_TYPE;

  @property({ type: Number, reflect: true })
  start: number | undefined;

  @property({ type: Boolean, reflect: true, attribute: "keep-parent-counter" })
  keepParentCounter = false;

  @queryAssignedElements({ selector: "ol", flatten: false })
  olElements: HTMLOListElement[] | undefined;

  #setListType() {
    this.olElements?.forEach(($ol) => {
      $ol.classList.remove(...getAllMarkerClassnames());
      $ol.classList.add(getMarkerClassname(this.type));
    });
  }

  #setListStart() {
    this.olElements?.forEach(($ol) => {
      if (this.start === undefined) {
        $ol.removeAttribute("start");
        $ol.style.counterReset = "";
      } else {
        $ol.setAttribute("start", this.start.toString());
        $ol.style.counterReset = `list-item ${this.start - 1}`;
      }
    });
  }

  #setListCounters() {
    this.olElements?.forEach(($ol) => {
      if (this.keepParentCounter) {
        $ol.setAttribute("keep-parent-counter", "");
      } else {
        $ol.removeAttribute("keep-parent-counter");
      }
    });
  }

  #setListBaseClassname() {
    this.olElements?.forEach(($ol) => {
      $ol.classList.add(LIST_CLASSNAME);
    });
  }

  #onSlotChanged() {
    this.#setListType();
    this.#setListStart();
    this.#setListCounters();
    this.#setListBaseClassname();
  }

  protected override willUpdate(
    changedProperties: Map<PropertyKey, unknown>
  ): void {
    if (changedProperties.has("type")) {
      this.#setListType();
    }

    if (changedProperties.has("start")) {
      this.#setListStart();
    }

    if (changedProperties.has("keepParentCounter")) {
      this.#setListCounters();
    }
  }

  protected override render() {
    return html`<slot @slotchange=${this.#onSlotChanged}></slot>`;
  }
}
