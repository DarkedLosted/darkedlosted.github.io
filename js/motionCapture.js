(function() {

    function motionCapture() {
        var buffId = 0,
            inited = false;

        /**
         * init Motion detector
         * @param video
         * @param append
         */
        this.init = function initialize(video, append) {
            if (inited) {
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
            this.ctx.drawImage(video, 0, 0, this.width, this.height);
            this.video = video;

            append.appendChild(this.canvas);

            for (let i = 0; i < 2; i++) {
                this.buffers.push(new Uint8Array(this.width * this.height));
            }

            inited = true;

            this.draw();
        };

        /**
         * get frame from video stream
         * @returns {*}
         */
        this.getFrame = function getFrame() {
            try {
                this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
            } catch (e) {
                return null;
            }

            return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        };

        /**
         * draw rectangle on motion detected
         * @type {any}
         */
        this.draw = function draw() {
            let frame = this.getFrame();

            if (frame) {
                this.markLightnessChanges(frame.data);
            }

            requestAnimationFrame(this.draw);
        }.bind(this);

        /**
         * define position of detected motion
         * @param data
         */
        this.markLightnessChanges = function markLightnessChanges(data) {
            let buffer = this.buffers[buffId++ % this.buffers.length],
                current = 0,
                pixelPos = new u.Pointer(0, 0),
                minPos = new u.Pointer(this.width, this.height),
                maxPos = new u.Pointer(0, 0),
                lightnessChanged;

            this.ctx.clearRect(0,0,this.width,this.height);

            for (let i = 0, j = 0; i < buffer.length; i++, j += 4) {
                buffer[i] = u.lightnessValue(data[j], data[j + 1], data[j + 2]);
                lightnessChanged = this.lightnessHasChanged(i, buffer[i]);

                if (lightnessChanged) {
                    pixelPos.x = j / 4 % this.width;
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

                this.ctx.strokeStyle = `#1ed10a`;
                this.ctx.strokeRect(minPos.x, minPos.y, Math.abs(maxPos.x - minPos.x), Math.abs(maxPos.y - minPos.y));
        };

        /**
         * determine difference lightness value of every pixel on threshold
         * @param index
         * @param value
         * @returns {boolean}
         */
        this.lightnessHasChanged = function lightnessHasChanged(index, value) {
            return this.buffers.some((buffer) => Math.abs(value - buffer[index]) >= 15);
        };

        /**
         * remove canvas
         */
        this.remove = function() {
            inited = false;
            this.canvas.remove();
        };
    }

    window.motionCapture = motionCapture;
}());
