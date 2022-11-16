import { EventEmitter } from "eventemitter3"
import { Result } from "thin-result";
import TypedEmitter from "typed-emitter"
import { IconData, iconRegister, IconRegister } from './IconRegister';
import { IconName } from './iconsMap';

type EventMap = {
  iconLoad: (iconProps: { iconId: string, iconMarkup: string }) => void,
  iconFailed: (err: Error) => void,
}

class IconService {
  #eventEmitter = new EventEmitter as TypedEmitter<EventMap>;
  #iconRegister: IconRegister;

  constructor(register: IconRegister) {
    this.#iconRegister = register;
  }

  onIconLoad(listener: EventMap['iconLoad']): VoidFunction {
    this.#eventEmitter.addListener('iconLoad', listener);

    return () => {
      this.#eventEmitter.removeListener('iconLoad', listener);
    }
  }

  loadIcon(iconName: IconName, callback?: EventMap['iconLoad']): Promise<Result<IconData, Error>> {
    if (callback) {
      this.#eventEmitter.once('iconLoad', callback);
    }

    return this.#iconRegister.requestIcon(iconName).then((value) => {
      if (value.success) {
        this.#eventEmitter.emit('iconLoad', value.data);
      } else {
        this.#eventEmitter.emit('iconFailed', value.error);
      }
      return value;
    });
  }
}

export const iconService = new IconService(iconRegister);
