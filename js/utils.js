(function() {

    function utils(value) {
    }

    utils.getIcons = function getIcons() {
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
            stats: 'icons/stats.svg'
        }
    };

    utils.lightnessValue = function lightnessValue(r, g, b) {
        return (Math.min(r, g, b) + Math.max(r, g, b)) / 255 * 50;
    };

    utils.getLightValue = function getLightValue(video) {
        let canvas = document.createElement('canvas'),
            width = video.videoWidth,
            height = video.videoHeight,
            ctx = canvas.getContext('2d'),
            data, current, count = 0, light = 0;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(video, 0, 0, width, height);
        data = ctx.getImageData(0, 0, width, height).data;
        for (let i = 0, j = 0; i < (width * height); i++, j += 4) {
            current = u.lightnessValue(data[j], data[j + 1], data[j + 2]);

            light+= current;
            count++
        }

        return (light / count).toFixed(1);
    };

    window.u = utils;
}());
