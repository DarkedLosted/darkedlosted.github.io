function initVideo(video, url) {
    if (Hls.isSupported()) {
        var hls = new Hls({liveDurationInfinity: true});
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
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
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }

    // video.onclick = function() {
    //     video.classList.add('fscreen');
    // };
}

function initPlayerControls() {
    var videoNodes = Array.from(document.getElementsByClassName('video'));

    console.log(videoNodes);

    videoNodes.forEach(function(video) {
        let brigthness = video.parentNode.querySelector('.input__brightness'),
            contrast = video.parentNode.querySelector('.input__contrast'),
            brightnessValue = brigthness.value / 10,
            contrastValue = contrast.value / 10,
            backButton = video.parentNode.querySelector('.player__button'),
            analyzer = new audioAnalyzer();

        brigthness.oninput = function() {
            brightnessValue = brigthness.value / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        };

        contrast.oninput = function() {
            contrastValue = contrast.value / 10;
            video.style.filter = `contrast(${ contrastValue }) brightness(${ brightnessValue })`;
        };

        video.onclick = function() {
            video.parentNode.classList.add('video-opened');
            video.muted = false;
            analyzer.connectVideo(video);
            console.log('muted must be false!');
        };

        backButton.onclick = function() {
            video.parentNode.classList.remove('video-opened');
            video.muted = true;
        };

        video.addEventListener('pause canplay', function() {
            video.play();
        });
    });
}

function audioAnalyzer() {
    this.context = this.context || new (window.AudioContext || window.webkitAudioContext)();
    this.node = this.node || this.context.createScriptProcessor(2048, 1, 1);
    this.video = this.video || arguments[0];

    this.analyser = this.analyser || this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);

    this.connectVideo = function(video) {
        this.source = this.context.createMediaElementSource(video);
            this.source.connect(this.analyser);
            this.analyser.connect(this.node);
            this.node.connect(this.context.destination);
            this.source.connect(this.context.destination);

            this.node.onaudioprocess = function () {
                this.analyser.getByteFrequencyData(this.bands);

                setInterval(draw(this.bands, video), 150);

            }.bind(this);
    };

    return this;
}

function draw(bands, video) {
    //window.webkitRequestAnimationFrame(draw);

    var canvas = video.parentNode.querySelector('.canvas'),
        ctx = canvas.getContext('2d'),
        bars = 256,
        rectX,
        rectWidth,rectHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
        // '#00CCFF';
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
    //var a = new audioAnalyzer(document.getElementById('video-2'));

    initVideo(
        document.getElementById('video-1'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-2'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-3'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
    );

    initVideo(
        document.getElementById('video-4'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
    );
})();
