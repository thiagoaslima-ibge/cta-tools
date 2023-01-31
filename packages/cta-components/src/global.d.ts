interface EventListener {
    (evt: Event): void;
    (evt: CustomEvent): void;
}

interface EventListenerObject {
    handleEvent(object: Event): void;
    handleEvent(object: CustomEvent): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CtaContext {}
