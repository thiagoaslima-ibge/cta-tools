import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './index.css';

const TAG_NAME = 'cta-theme';

declare global {
  interface HTMLElementTagNameMap {
    [TAG_NAME]: CtaTheme
  }
}

@customElement(TAG_NAME)
export class CtaTheme extends LitElement {
  static tagName = TAG_NAME;

  render() {
    return html`
    <p>theme</p>
    <cta-icons-sprite></cta-icons-sprite>
    `;
  }
}
