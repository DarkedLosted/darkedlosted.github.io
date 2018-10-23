(function() {

    /**
     * Utils module
     */
    function utils() {
    }

    /**
     * Get Icons for feed events
     * @returns {{cam: string, kettle: string, battery: string, fridge: string, music: string, ac: string, thermal: string, router: string, key: string, "robot-cleaner": string, stats: string}}
     */
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
        };
    };

    /**
     * Pointer constructor
     * @param x
     * @param y
     * @constructor
     */
    utils.Pointer = function Pointer(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    };

    /**
     * Get light value
     * @param r
     * @param g
     * @param b
     * @returns {number}
     */
    utils.lightnessValue = function lightnessValue(r, g, b) {
        return (Math.min(r, g, b) + Math.max(r, g, b)) / 255 * 50;
    };

    /**
     * Get Light value in the room
     * @param video
     * @returns {string}
     */
    utils.getLightValue = function getLightValue(video) {
        let canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            data;

        canvas.width = 1;
        canvas.height = 1;

        ctx.drawImage(video, 0, 0, 1, 1);
        data = ctx.getImageData(0, 0, 1, 1).data;

        return ((data[0] + data[1] + data[2]) / 3).toFixed(1);
    };

    window.u = utils;
}());
