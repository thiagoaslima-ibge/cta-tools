declare global {
    // eslint-disable-next-line no-var
    var __cta__: CtaContext;
}

export function setGlobal(
    value: { [K in keyof CtaContext]?: CtaContext[K] } = {}
) {
    globalThis.__cta__ = globalThis.__cta__ ?? {};
    Object.assign(globalThis.__cta__, value);
}
