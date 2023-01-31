import { LitElement } from "lit";
import { property } from "lit/decorators.js";

import { createIdGenerator } from "@lib/getSerialId";
import { kebabCase } from "lodash";

const getId = createIdGenerator();

const converter = {
  fromAttribute: (value: string | null): string => {
    return value?.trim() || "";
  },
  toAttribute: (value: string): string | null => {
    return value.trim() || null;
  },
};

export class CTAElement extends LitElement {
  #id = "";

  @property({ type: String, reflect: true, converter })
  get id() {
    return this.#id;
  }
  set id(value: string) {
    this.#id = value;
    this.requestUpdate();
  }

  @property({
    type: String,
    reflect: true,
    converter,
  })
  testid = "";

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("id")) {
      const id = `${this.#formattedName()}-${getId()}`;
      this.setAttribute("id", id);
      this.id = id;
    }
  }

  #formattedName() {
    const { name } = this.constructor;
    return kebabCase(name).toLocaleLowerCase().replace("-element", "");
  }
}
