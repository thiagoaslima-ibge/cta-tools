import type { ReactiveController, ReactiveControllerHost } from "lit";

import { createIdGenerator } from "@lib/getSerialId";
import {
  getCurrentMediaQuery,
  type MediaQuery,
} from "@lib/getCurrentMediaQuery";
import { debounce } from "lodash";

const getId = createIdGenerator("resize-event");

interface ResizeEvent {
  id: string;
  screen: Screen;
  mediaQuery: MediaQuery;
}

class ResizeMediator {
  listeners = new Map<HTMLElement, (event: ResizeEvent) => unknown>();

  listen(element: HTMLElement, callback: (event: ResizeEvent) => unknown) {
    this.listeners.set(element, callback);
    callback(this.#createResizeEvent());

    return () => this.unlisten(element);
  }

  unlisten(element: HTMLElement) {
    this.listeners.delete(element);
  }

  notify() {
    if (this.listeners.size > 0) {
      const event = this.#createResizeEvent();
      this.listeners.forEach((fn) => {
          fn(event);
      });
    }
  }

  #createResizeEvent() {
    return {
      id: getId(),
      screen: window.screen,
      mediaQuery: getCurrentMediaQuery(),
    }
  }
}

const mediator = new ResizeMediator();

const debouncedListener = debounce(() => {
  mediator.notify();
}, 300, { trailing: true, maxWait: 900 });

window.addEventListener('resize', debouncedListener);

export class WindowResizeController implements ReactiveController {
  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private callback: (event: ResizeEvent) => unknown
  ) {
    // Register for lifecycle updates
    host.addController(this);
  }

  hostConnected(): void {
    mediator.listen(this.host, this.callback);
  }

  hostDisconnected(): void {
    mediator.unlisten(this.host);
  }
}
