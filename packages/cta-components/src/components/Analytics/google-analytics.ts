import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTagManagerUrl, GOOGLE_ANALYTICS_PROPERTY_ID } from "./constants";

interface CurrentScript {
  id: string;
  element: HTMLScriptElement;
}

const TAG_NAME = "cta-google-analytics";

@customElement(TAG_NAME)
export class CTAGoogleAnalytics extends LitElement {
  @property()
  gaId = GOOGLE_ANALYTICS_PROPERTY_ID;

  private currentTagManagerScript?: CurrentScript | null = null;
  private currentDataLayerScript?: CurrentScript | null = null;

  private createScriptTagForTagManager(document: Document) {
    const url = getTagManagerUrl(this.gaId);
    const script = document.createElement("script");
    script.src = url.toString();
    script.async = true;
    return script;
  }

  private createScriptTagForDataLayer(document: Document) {
    const script = document.createElement("script");
    script.async = true;
    script.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', ${this.gaId});
        `;
    return script;
  }

  setGAScripts() {
    if (this.gaId && globalThis.document) {
      const { document } = globalThis;
      const { head } = document;
      const currentTagManager = this.currentTagManagerScript;
      const currentDataLayer = this.currentDataLayerScript;

      if (currentTagManager?.id !== this.gaId) {
        const newTagManagerScript = this.createScriptTagForTagManager(document);
        currentTagManager?.element &&
          head.removeChild(currentTagManager.element);
        newTagManagerScript && head.appendChild(newTagManagerScript);
        this.currentTagManagerScript = {
          id: this.gaId,
          element: newTagManagerScript,
        };
      }

      if (currentDataLayer?.id !== this.gaId) {
        const newDataLayerScript = this.createScriptTagForDataLayer(document);
        currentDataLayer?.element && head.removeChild(currentDataLayer.element);
        newDataLayerScript && head.appendChild(newDataLayerScript);
        this.currentDataLayerScript = {
          id: this.gaId,
          element: newDataLayerScript,
        };
      }
    }
  }

  connectedCallback(): void {
    this.setGAScripts();
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has("gaId")) {
      this.setGAScripts();
    }
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CTAGoogleAnalytics;
  }
}
