import { LitElement } from "lit";
import { IconName } from "./iconsMap";
declare const TAG_NAME = "cta-icon";
declare global {
    interface HTMLElementTagNameMap {
        [TAG_NAME]: IconElement;
    }
}
export interface IconElement extends HTMLElement {
    /** The svg icon id */
    name: IconName;
    /**
     * The icon is used inline or as a block element
     * @default false
     */
    inline?: boolean;
    /** CSS class to be applied directly on the svg element */
    class?: string;
}
export declare class Icon extends LitElement {
    #private;
    id: string;
    dataTestId: string;
    get name(): IconName | "";
    set name(iconName: IconName | "");
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/unsafe-svg").UnsafeSVGDirective>;
}
export {};
//# sourceMappingURL=Icon.d.ts.map