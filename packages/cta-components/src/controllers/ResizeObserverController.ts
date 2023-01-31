import type { ReactiveController, ReactiveControllerHost } from "lit";

import { createIdGenerator } from "@lib/getSerialId";
import {
  getCurrentMediaQuery,
  type MediaQuery,
} from "@lib/getCurrentMediaQuery";

const getId = createIdGenerator("resize-event");

interface ResizeEvent<T extends HTMLElement> {
  id: string;
  mediaQuery: MediaQuery;
  screen: Screen;
  element: T;
}

type ObserverEvent = Omit<ResizeEvent<HTMLElement>, "element"> & {
  elements: Set<Element>;
};

class ResizeMediator {
  listeners = new Map<HTMLElement, (event: ResizeEvent<HTMLElement>) => unknown>();

  listen(element: HTMLElement, callback: (event: ResizeEvent<HTMLElement>) => unknown) {
    this.listeners.set(element, callback);

    return () => this.unlisten(element);
  }

  unlisten(element: HTMLElement) {
    this.listeners.delete(element);
  }

  notify(event: ObserverEvent) {
    this.listeners.forEach((fn, element) => {
      if (event.elements.has(element) || event.elements.has(globalThis.document.body)) {
        fn({
          id: event.id,
          mediaQuery: event.mediaQuery,
          screen: event.screen,
          element,
        });
      }
    });
  }
}

const resizeMediator = new ResizeMediator();

const observer = new ResizeObserver((entries) => {
  console.log('resizeObserver')
  const mediaQuery = getCurrentMediaQuery();
  const screen = globalThis.screen;
  const elements = new Set<Element>();

  for (const entry of entries) {
    elements.add(entry.target);
  }

  resizeMediator.notify({
    id: getId(),
    mediaQuery,
    screen,
    elements,
  });
});

observer.observe(globalThis.document.body);

window.addEventListener('resize', () => console.log('resize'));

export class ResizeObserverController implements ReactiveController {
  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private callback: (event: ResizeEvent<HTMLElement>) => unknown
  ) {
    // Register for lifecycle updates
    host.addController(this);
  }

  hostConnected(): void {
    observer.observe(this.host);
    resizeMediator.listen(this.host, this.callback);
  }

  hostDisconnected(): void {
    observer.unobserve(this.host);
    resizeMediator.unlisten(this.host);
  }
}
