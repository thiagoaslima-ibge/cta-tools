import { LitElement } from 'lit';
import './index.css';
export { IconSprite } from './icons/IconSprite';
declare const TAG_NAME = "cta-theme";
declare global {
    interface HTMLElementTagNameMap {
        [TAG_NAME]: CtaTheme;
    }
}
export declare class CtaTheme extends LitElement {
    static tagName: string;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=index.d.ts.map