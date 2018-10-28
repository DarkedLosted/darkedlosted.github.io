import { MotionCapture } from "./motionCapture";
import { u } from "./utils";
declare var Hls: any;
/**
 * Инициализируем потоковые видео
 * @param video
 * @param url
 */
function initVideo(video: HTMLVideoElement, url: string) {
    if (Hls.isSupported()) {
        const hls = new Hls({
            autoStartLoad: true,
            liveDurationInfinity: true,
            maxBufferSize: 0,
            maxBufferLength: 30,
            liveSyncDuration: 30,
            liveMaxLatencyDuration: Infinity,
            defaultAudioCodec: 'mp4a.40.5'
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.firstLevel = 1;
        hls.loadLevel = -1;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
    }
}

/**
 * Инициализируем контролы для видео плеера
 */
function initPlayerControls() {
    const videoNodes: HTMLVideoElement[] = Array.from(document.getElementsByClassName('video')) as HTMLVideoElement[];

    videoNodes.forEach((video: HTMLVideoElement) => {
        const parentVideoNode = video.parentNode as HTMLElement;
        const brigthness: HTMLInputElement | null = parentVideoNode.querySelector('.input__brightness');
        const contrast: HTMLInputElement | null = parentVideoNode.querySelector('.input__contrast');
        const backButton = parentVideoNode.querySelector('.player__button');
        const controlsPanel = parentVideoNode.querySelector('.player__panel');
        const settings = parentVideoNode.querySelector('.player__settings');
        const settingsButton = parentVideoNode.querySelector('.settings_icon');
        const analyzer = new AudioAnalyzer();
        const motionDetection = new MotionCapture();
        let brightnessValue = brigthness && parseInt(brigthness.value) / 10,
            contrastValue = contrast && parseInt(contrast.value) / 10;

        brigthness && brigthness.addEventListener('input', () => {
            brightnessValue = brigthness && parseInt(brigthness.value) / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        });

        contrast && contrast.addEventListener('input', () => {
            contrastValue = contrast && parseInt(contrast.value) / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        });

        video.addEventListener('click', () => {
            parentVideoNode.classList.add('video-opened');
            controlsPanel && controlsPanel.classList.remove('hidden');
            video.muted = false;
            analyzer.connectVideo(video);
            analyzer.play();
            setTimeout(() => {
                motionDetection.init(video, video.parentNode as HTMLElement);
            }, 1000);
        });

        backButton && backButton.addEventListener('click', () => {
            parentVideoNode.classList.remove('video-opened');
            controlsPanel && controlsPanel.classList.add('hidden');
            video.muted = true;
            analyzer.pause();
            motionDetection.remove();
        });

        settingsButton && settingsButton.addEventListener('click', () => {
            settings && settings.classList.toggle('hidden');
        });

        video.addEventListener('pause canplay', () => {
            video.play();
        });
    });
}

/**
 * Конструктор аудио анализатора
 * @returns {AudioAnalyzer}
 */
class AudioAnalyzer {
    private context: AudioContext;
    private node: ScriptProcessorNode;
    private video: HTMLVideoElement;

    private analyser: AnalyserNode;
    private bands: Uint8Array;
    private mediaElements: HTMLVideoElement[];
    private paint: boolean;
    private source: MediaElementAudioSourceNode | null;

    constructor() {
        this.context = new (AudioContext)(); // new (AudioContext || webkitAudioContext)();
        this.node = this.context.createScriptProcessor(2048, 1, 1);
        this.video = arguments[0];

        this.analyser = this.context.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.3;
        this.analyser.fftSize = 512;
        this.bands = new Uint8Array(this.analyser.frequencyBinCount);
        this.mediaElements = [];
        this.paint = true;
        this.source = null;

        return this;
    }

    public connectVideo = (video: HTMLVideoElement) => {
        if (this.mediaElements.includes(video)) {
            this.source = this.context.createMediaElementSource(video);
            this.mediaElements.push(video);
        }

        this.source && this.source.connect(this.analyser);
        this.analyser.connect(this.node);
        this.node.connect(this.context.destination);
        this.source && this.source.connect(this.context.destination);

        const canvas: HTMLCanvasElement | null = video.parentNode && video.parentNode.querySelector('.canvas');
        const ctx = canvas && canvas.getContext('2d');

        this.node.addEventListener('audioprocess', () => {
            this.analyser.getByteFrequencyData(this.bands);

            this.paint && draw(this.bands, canvas, ctx);
        });
    };

    public play = () => {
        this.paint = true;
    };

    public pause = () => {
        this.paint = false;
    };

    // return this;
}

/**
 * Отрисовываем диаграмму анализатора
 * @param bands
 * @param canvas
 * @param ctx
 */
function draw(bands: Uint8Array, canvas: HTMLCanvasElement | null, ctx: CanvasRenderingContext2D | null) {
    const bars = 256;
    let rectX,
        rectWidth,rectHeight;

    ctx && canvas && ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bars; i++) {
        rectX = i * 3;
        rectWidth = 2;
        rectHeight = (bands[i] / 2);

        if (ctx && canvas) {
            ctx.fillStyle = `rgb( ${ rectHeight + 170 }, 204, 255)`;
            ctx.fillRect(rectX, canvas.height - rectHeight / 2, rectWidth, rectHeight);
        }
    }
}

export function initVideos() {
    initPlayerControls();

    const videoUrls = [
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fsosed%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fcat%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fdog%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fhall%2Fmaster.m3u8'
    ];
    const videoNodes: HTMLVideoElement[] = Array.from(document.getElementsByClassName('video')) as HTMLVideoElement[];

    videoNodes.forEach((video, i) => {
        const videoLightValue = video.parentNode && video.parentNode.querySelector('.video__light-value');

        setTimeout(() => {
            if (videoLightValue) {
                videoLightValue.innerHTML = `LightValue: ${u.getLightValue(video)}`;
            }
        }, 1500);

        initVideo(video, videoUrls[i]);
    });
}
//
// (() => {
//     initPlayerControls();
//
//     const videoUrls = [
//         'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fsosed%2Fmaster.m3u8',
//         'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fcat%2Fmaster.m3u8',
//         'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fdog%2Fmaster.m3u8',
//         'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fhall%2Fmaster.m3u8'
//     ];
//     const videoNodes: HTMLVideoElement[] = Array.from(document.getElementsByClassName('video')) as HTMLVideoElement[];
//
//     videoNodes.forEach((video, i) => {
//         const videoLightValue = video.parentNode && video.parentNode.querySelector('.video__light-value');
//
//         setTimeout(() => {
//             if (videoLightValue) {
//                 videoLightValue.innerHTML = `LightValue: ${u.getLightValue(video)}`;
//             }
//         }, 1500);
//
//         initVideo(video, videoUrls[i]);
//     });
// })();

