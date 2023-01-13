import { ReactiveController, ReactiveControllerHost } from "lit";
import { CtaIcon } from "../Icon";
import { iconService } from '../lazy/IconService';

interface HostElement {
  name: string;
  iconMarkup?: string | Promise<string>;
}

interface IconsMapItem {
  name: string;
  path: string;
  value: Promise<string> | string;
}

export class CTAIconServiceController implements ReactiveController {
  host: ReactiveControllerHost & HostElement;

  private icons = new Map<string, IconsMapItem>();

  constructor(host: ReactiveControllerHost & HostElement) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    this.getIcon(this.host.name);
  }

  hostDisconnected(): void {
    
  }

  hostUpdate(): void {
    this.getIcon(this.host.name);
  }

  getIcon(name?: string) {
    if (!name) {
      return;
    }

    if (this.icons.has(name)) {
      this.host.iconMarkup = this.icons.get(name)?.value;
    }
    
    if (this.icons.has(name)) {
      const promise = globalThis.iconService.get(name);
      this.host.iconMarkup = promise;
      promise.then(response => {
        this.icons.set(name, response)
        this.host.requestUpdate()l
      })
    }

  }
}
