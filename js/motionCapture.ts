import { u } from "./utils";
import {Pointer} from "./types/utils.types";

export class MotionCapture {
    private buffId: number = 0;
    private inited: boolean = false;

    private canvas: HTMLCanvasElement = document.createElement('canvas');
    private buffers: Uint8Array[] = [];
    private width: number = 0;
    private height: number = 0;

    private ctx: CanvasRenderingContext2D | null = null;
    private video: HTMLVideoElement | null = null;

    constructor() {
        return this;
    }
    /**
     * init Motion detector
     * @param video
     * @param append
     */
    public init = (video: HTMLVideoElement, append: HTMLElement) => {
      if (this.inited) {
        return;
      }

      this.canvas = document.createElement('canvas');
      this.buffers = [];
      this.width = video.getBoundingClientRect().width;
      this.height = video.getBoundingClientRect().height;

      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.classList.add('motion_canvas');

      this.ctx = this.canvas.getContext('2d');
      this.ctx && this.ctx.drawImage(video, 0, 0, this.width, this.height);
      this.video = video;

      append.appendChild(this.canvas);

      for (let i = 0; i < 2; i++) {
        this.buffers[this.buffers.length] = new Uint8Array(this.width * this.height);
      }

      this.inited = true;

      this.draw();
    };

    /**
     * remove canvas
     */
    public remove = () => {
      this.inited = false;
      this.canvas.remove();
    };

    /**
     * get frame from video stream
     * @returns {*}
     */
    private getFrame = () => {
      try {
          this.ctx && this.ctx.drawImage(this.video as CanvasImageSource, 0, 0, this.width, this.height);
      } catch (e) {
          return null;
      }

        return this.ctx && this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    };

    /**
     * draw rectangle on motion detected
     * @type {any}
     */
    private draw = () => {
        const frame = this.getFrame();

      if (frame) {
        this.markLightnessChanges(frame.data);
      }

      requestAnimationFrame(this.draw);
    };

    /**
     * define position of detected motion
     * @param data
     */
    private markLightnessChanges = (data: Uint8ClampedArray) => {
      const buffer = this.buffers[this.buffId++ % this.buffers.length];
      const pixelPos: Pointer = {
          x: 0,
          y: 0
      };
      const minPos: Pointer = {
          x: this.width,
          y: this.height
      };
      const maxPos: Pointer = {
          x: 0,
          y: 0
      };
      let lightnessChanged;

        this.ctx && this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0, j = 0; i < buffer.length; i++, j += 4) {
        buffer[i] = u.lightnessValue(data[j], data[j + 1], data[j + 2]);
        lightnessChanged = this.lightnessHasChanged(i, buffer[i]);

        if (lightnessChanged) {
          pixelPos.x = (j / 4) % this.width;
          pixelPos.y = Math.floor((j / 4 - pixelPos.x) / this.width);

          if (minPos.x > pixelPos.x && pixelPos.x !== 0) {
            minPos.x = pixelPos.x;
          }
          if (minPos.y > pixelPos.y && pixelPos.y !== 0) {
            minPos.y = pixelPos.y;
          }
          if (maxPos.x < pixelPos.x && pixelPos.x !== 0) {
            maxPos.x = pixelPos.x;
          }
          if (maxPos.x < pixelPos.x && pixelPos.y !== 0) {
            maxPos.x = pixelPos.x;
          }
        }
      }

      if (this.ctx) {
          this.ctx.strokeStyle = `#1ed10a`;
          this.ctx.strokeRect(minPos.x, minPos.y, Math.abs(maxPos.x - minPos.x), Math.abs(maxPos.y - minPos.y));
      }
    };

    /**
     * determine difference lightness value of every pixel on threshold
     * @param index
     * @param value
     * @returns {boolean}
     */
    private lightnessHasChanged = (index: number, value: number) => {
      return this.buffers.some((buffer) => Math.abs(value - buffer[index]) >= 15);
    };
}


