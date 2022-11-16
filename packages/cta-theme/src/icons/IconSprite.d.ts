import { LitElement } from "lit";
declare const TAG_NAME = "cta-icons-sprite";
declare global {
    interface HTMLElementTagNameMap {
        [TAG_NAME]: IconSprite;
    }
}
export declare class IconSprite extends LitElement {
    #private;
    createRenderRoot(): this;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<2>;
}
export {};
//# sourceMappingURL=IconSprite.d.ts.map