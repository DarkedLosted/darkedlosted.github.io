/**
 * Инициализируем потоковые видео
 * @param video
 * @param url
 */
function initVideo(video, url) {
    if (Hls.isSupported()) {
        var hls = new Hls({
            liveDurationInfinity: true,
            autoStartLoad: true,
            defaultAudioCodec: 'mp4a.40.5'
        });
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.firstLevel = 1;
        hls.loadLevel = -1;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
           if (data.fatal) {
             switch(data.type) {
             case Hls.ErrorTypes.NETWORK_ERROR:
               console.log("fatal network error encountered, try to recover");
               hls.startLoad();
               break;
             case Hls.ErrorTypes.MEDIA_ERROR:
               console.log("fatal media error encountered, try to recover");
               hls.recoverMediaError();
               break;
             }
           }
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
    let videoNodes = Array.from(document.getElementsByClassName('video'));

    videoNodes.forEach((video) => {
        let brigthness = video.parentNode.querySelector('.input__brightness'),
            contrast = video.parentNode.querySelector('.input__contrast'),
            brightnessValue = brigthness.value / 10,
            contrastValue = contrast.value / 10,
            backButton = video.parentNode.querySelector('.player__button'),
            controlsPanel = video.parentNode.querySelector('.player__panel'),
            settings = video.parentNode.querySelector('.player__settings'),
            settingsButton = video.parentNode.querySelector('.settings_icon'),
            analyzer = new audioAnalyzer(),
            motionDetection = new motionCapture();

        brigthness.addEventListener('input', () => {
            brightnessValue = brigthness.value / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        });

        contrast.addEventListener('input', () => {
            contrastValue = contrast.value / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        });

        video.addEventListener('click', () => {
            video.parentNode.classList.add('video-opened');
            controlsPanel.classList.remove('hidden');
            video.muted = false;
            analyzer.connectVideo(video);
            analyzer.play();
            setTimeout(() => {
                motionDetection.init(video, video.parentNode);
            }, 1000);
        });

        backButton.addEventListener('click', () => {
            video.parentNode.classList.remove('video-opened');
            controlsPanel.classList.add('hidden');
            video.muted = true;
            analyzer.pause();
            motionDetection.remove();
        });

        settingsButton.addEventListener('click', () => {
            settings.classList.toggle('hidden');
        });

        video.addEventListener('pause canplay', () => {
            video.play();
        });
    });
}

/**
 * Конструктор аудио анализатора
 * @returns {audioAnalyzer}
 */
function audioAnalyzer() {
    this.context = this.context || new (window.AudioContext || window.webkitAudioContext)();
    this.node = this.node || this.context.createScriptProcessor(2048, 1, 1);
    this.video = this.video || arguments[0];

    this.analyser = this.analyser || this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
    this.mediaElements = [];
    this.paint = true;

    this.connectVideo = (video) => {
        if (!this.mediaElements.includes(video)) {
            this.source = this.context.createMediaElementSource(video);
            this.mediaElements.push(video);
        }

        this.source.connect(this.analyser);
        this.analyser.connect(this.node);
        this.node.connect(this.context.destination);
        this.source.connect(this.context.destination);

        let canvas = video.parentNode.querySelector('.canvas'),
            ctx = canvas.getContext('2d');

        this.node.addEventListener('audioprocess', () => {
            this.analyser.getByteFrequencyData(this.bands);

            this.paint && draw(this.bands, canvas, ctx);
        });
    };

    this.play = () => {
        this.paint = true;
    };

    this.pause = () => {
        this.paint = false;
    };

    return this;
}

/**
 * Отрисовываем диаграмму анализатора
 * @param bands
 * @param canvas
 * @param ctx
 */
function draw(bands, canvas, ctx) {
    let bars = 256,
        rectX,
        rectWidth,rectHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bars; i++) {
        rectX = i * 3;
        rectWidth = 2;
        rectHeight = (bands[i] / 2);

        ctx.fillStyle = `rgb( ${ rectHeight + 170 }, 204, 255)`;
        ctx.fillRect(rectX, canvas.height - rectHeight / 2, rectWidth, rectHeight);
    }
}

(function() {
    initPlayerControls();

    let videoUrls = [
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fsosed%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fcat%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fdog%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A8000%2Fstreams%2Fhall%2Fmaster.m3u8'
    ],
        videoNodes = Array.from(document.getElementsByClassName('video'));

    videoNodes.forEach((video, i) => {
        let videoLightValue = video.parentNode.querySelector('.video__light-value');

        setTimeout(() => {
            videoLightValue.innerHTML = `LightValue: ${u.getLightValue(video)}`;
        }, 1500);

        initVideo(video, videoUrls[i]);
    });
})();
