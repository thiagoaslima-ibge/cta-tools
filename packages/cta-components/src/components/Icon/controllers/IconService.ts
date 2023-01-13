const icons = [
  'close-circle',
]

export class IconService {
  static _instance: IconService | null = null;
  iconsFolder: string = '';
  
  constructor(iconsFolder: string) {
    if (IconService._instance) {
      return IconService._instance;
    }

    this.iconsFolder = iconsFolder.endsWith('/') ? iconsFolder.slice(0, -1) : iconsFolder;
    return this;
  }

  get(iconName: string) {
    if (icons.includes(iconName)) {
      const url = new URL(`${this.iconsFolder}/${iconName}`);
      return fetch(url, {
        mode: "cors",
        credentials: "same-origin",
      })
    }

    return Promise.reject('Unknown icon');
  }

}

declare global {
  var iconService: IconService;
}