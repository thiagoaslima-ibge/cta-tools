import { CTAIconService, iconService } from "./components/Icon/IconService";
import { setGlobal } from "./lib/setGlobal";

export function init() {
    setGlobal({ iconService });
}

declare global {
    interface CtaContext {
        iconService: CTAIconService
    }
}
