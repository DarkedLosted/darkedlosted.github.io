  /**
   * u module
   */
  export function u() {
      const a: string = '';
  }

  /**
   * Get Icons for feed events
   * @returns {{cam: string, kettle: string, battery: string, fridge: string, music: string, ac: string, thermal: string, router: string, key: string, "robot-cleaner": string, stats: string}}
   */
  u.getIcons = function getIcons() {
    return {
      cam: 'icons/cam.svg',
      kettle: 'icons/kettle.svg',
      battery: 'icons/battery.svg',
      fridge: 'icons/fridge.svg',
      music: 'icons/music.svg',
      ac: 'icons/ac.svg',
      thermal: 'icons/thermal.svg',
      router: 'icons/router.svg',
      key: 'icons/key.svg',
      'robot-cleaner': 'icons/robot-cleaner.svg',
      stats: 'icons/stats.svg',
    };
  };

  /**
   * Pointer constructor
   * @param x
   * @param y
   * @constructor
   */
  // u.Pointer = function Pointer(x = 0, y = 0) {
  //   this.x = x;
  //   this.y = y;
  // };

  u.getElement = <T extends HTMLElement = HTMLElement>(elem: string, scope?: Element | DocumentFragment) => {
      return (scope || document).querySelector<T>(elem);
  };

  /**
   * Get light value
   * @param r
   * @param g
   * @param b
   * @returns {number}
   */
  u.lightnessValue = function lightnessValue(r: number, g: number, b: number) {
    return ((Math.min(r, g, b) + Math.max(r, g, b)) / 255) * 50;
  };

  /**
   * Get Light value in the room
   * @param video
   * @returns {string}
   */
  u.getLightValue = function getLightValue(video: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    let data: Uint8ClampedArray;

    canvas.width = 1;
    canvas.height = 1;

    if (ctx) {
        ctx.drawImage(video, 0, 0, 1, 1);
        data = ctx.getImageData(0, 0, 1, 1).data;
    } else {
        data = new Uint8ClampedArray(32);
    }

    return (data && (data[0] + data[1] + data[2]) / 3).toFixed(1);
  };

