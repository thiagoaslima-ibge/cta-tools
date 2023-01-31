import { html, LitElement, unsafeCSS } from "lit";
import {
  property,
  customElement,
  queryAssignedElements,
} from "lit/decorators.js";

import styles from "./unordered-list.css";
import {
  DEFAULT_UNORDERED_LIST_MARKER_TYPE,
  getAllMarkerClassnames,
  getMarkerClassname,
  isUnorderedListMarkerType,
  type UnorderedListMarkerType,
} from "./list-markers";

const TAG_NAME = "cta-unordered-list";
const LIST_CLASSNAME = "cta__unordered-list";

export interface CTAUnorderedListElement
  extends Omit<HTMLOListElement, "reversed" | "start" | "type"> {
  "data-testid"?: string;
  type?: UnorderedListMarkerType;
  customType?: string;
}

@customElement(TAG_NAME)
export class CTAUnorderedList extends LitElement {
  static styles = unsafeCSS(styles);

  @property({
    type: String,
    reflect: true,
    converter(value): UnorderedListMarkerType {
      if (isUnorderedListMarkerType(value)) {
        return value;
      }
      return DEFAULT_UNORDERED_LIST_MARKER_TYPE;
    },
  })
  type: UnorderedListMarkerType = DEFAULT_UNORDERED_LIST_MARKER_TYPE;

  @property({
    type: String,
    reflect: true,
  })
  customType: string | undefined;

  @queryAssignedElements({ selector: "ul", flatten: false })
  ulElements: HTMLUListElement[] | undefined;

  #setListType() {
    const allClassnames = getAllMarkerClassnames();

    this.ulElements?.forEach(($ul) => {
      $ul.classList.remove(...allClassnames);

      if (this.type) {
        $ul.classList.add(getMarkerClassname(this.type));
        $ul.removeAttribute("data-marker-type");
        if ($ul.style.listStyleType) {
          $ul.style.listStyleType = "";
        }
        return;
      }

      if (this.customType) {
        $ul.setAttribute("data-marker-type", this.customType);
        $ul.style.listStyleType = `"${this.customType} "`;
      } else {
        $ul.removeAttribute("data-marker-type");
        $ul.style.listStyleType = "";
      }
    });
  }

  #setListBaseClassname() {
    this.ulElements?.forEach(($ul) => {
      $ul.classList.add(LIST_CLASSNAME);
    });
  }

  #onSlotChanged() {
    this.#setListType();
    this.#setListBaseClassname();
  }

  protected override willUpdate(
    changedProperties: Map<PropertyKey, unknown>
  ): void {
    console.log(changedProperties);
    if (changedProperties.has("type")) {
      this.#setListType();
    }
    if (changedProperties.has("customType")) {
      this.#setListType();
    }
  }

  protected override render() {
    return html`<slot @slotchange=${this.#onSlotChanged}></slot>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAUnorderedListElement;
  }
}
