import { html } from "lit";

import { CTAElement } from "@components/CTAElement";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

const TAG_NAME = "cta-image-gallery";

@customElement(TAG_NAME)
export class CTAImageGalleryElement extends CTAElement {
  @queryAssignedElements({ selector: "cta-image, img", flatten: true })
  images?: Array<HTMLImageElement>;

  @property({ type: Boolean, reflect: true })
  galleryOpen = false;

  openGallery() {
    console.log('click')
    this.galleryOpen = true;
  }

  render() {
    return html`
      <div @click=${this.openGallery}>
        <slot></slot>
      </div>
      <cta-modal ?open=${this.galleryOpen}>
        <div>
          ${repeat(
            this.images ?? [],
            (image) => image.id ?? image.src,
            (image) => image.cloneNode()
          )}
        </div>
      </cta-modal>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAImageGalleryElement;
  }
}
