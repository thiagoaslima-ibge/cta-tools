import { ReactiveController, ReactiveControllerHost } from "lit";
import { iconService } from "./IconService";

interface HostElement {
  name: string;
  iconMarkup?: string | Promise<string>;
}

export class CTAIconServiceController implements ReactiveController {
  host: ReactiveControllerHost & HostElement;
  currentIconName = "";

  constructor(host: ReactiveControllerHost & HostElement) {
    this.host = host;
    host.addController(this);
  }

  hostUpdate(): void {
    if (this.host.name && this.currentIconName !== this.host.name) {
      this.currentIconName = this.host.name;
      this.getIcon(this.host.name)?.then(
        (markup) => {
          this.host.iconMarkup = markup
        }
      );
    }
  }

  getIcon(name: string) {
    return iconService.getIcon(name);
  }
}
