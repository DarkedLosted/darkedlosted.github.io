'use strict';
/**
 * gesture.js для обработки жестов на тач стройствах
 */

(function() {
    if (isTouch()) {
        var img = document.querySelector('.error .additions__top'),
            currentGesture = null,
            eventCache = {},
            gestureState = {
                startDist: 0,
                startAngle: 0,
                startBrightness: 1,
                brightness: 1,
                angleDiff: 0,
                type: '',
                currentZoom: 100
            };

        img.addEventListener('pointerdown', (event) => {
            eventCache[event.pointerId] = event;

            currentGesture = {
                startX: event.clientX
            };

            if (!eventCache.length) {
                img.addEventListener('pointermove', pointerMoveHandler);
            }
        });

        addMultiEventListner(img, 'pointerup pointercancel pointerout pointerleave', (e) => {
            if (eventCache.length <= 1) {
                img.removeEventListener('pointermove', pointerMoveHandler);
            }

            gestureState.startBrightness = gestureState.brightness;
            gestureState.startDist = 0;
            gestureState.startAngle = 0;
            gestureState.type = '';
            currentGesture = null;
            delete eventCache[e.pointerId];
        });
    }

    function pointerMoveHandler(event) {
        const pointersCount = Object.keys(eventCache).length;

        if (pointersCount === 0 || !currentGesture) {
            return;
        }

        if (pointersCount === 2) {
            eventCache[event.pointerId] = event;

            const events = Object.values(eventCache);
            let curDiff = getDistanceBetweenPoints(events[0].clientX, events[0].clientY, events[1].clientX, events[1].clientY),
            angle = (Math.atan2(events[0].clientY - events[1].clientY, events[0].clientX - events[1].clientX) / Math.PI * 180);

            if (!gestureState.startDist) {
                gestureState.startDist = curDiff;
            }
            if (!gestureState.startAngle) {
                gestureState.startAngle = angle;
            }

            curDiff = curDiff - gestureState.startDist;
            const angleDiff = angle - gestureState.startAngle;

            if (!gestureState.type) {
                if (Math.abs(curDiff) > 24) {
                    gestureState.type = 'zoom';
                } else if (Math.abs(angleDiff) > 16) {
                    gestureState.type = 'rotate';
                }
            }

            if (gestureState.type === 'zoom') {
                zoom(curDiff);
            }
            if (gestureState.type === 'rotate') {
                rotate(angleDiff, angle);
            }
            } else if (pointersCount === 1 ) {
                const prevEvent = eventCache[event.pointerId];
                const xDiff = event.clientX - prevEvent.clientX;

                singleTouch(event, xDiff);

                eventCache[event.pointerId] = event;
        }
    }

    /**
     * Нахождение дистанции между 2мя точками
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    function getDistanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    /**
     * Прокрутка(поворот) изоображения(камеры)
     * @param event
     */
    function singleTouch(event, xDiff) {
        let bgPositionX = parseInt(img.style.backgroundPositionX) || 0,
            rotateText = document.querySelector('.touch__rotate'),
            slideLength = bgPositionX + xDiff,
            maxSlide = -((img.offsetWidth)),
            maxSlideCoef = getZoomRatio(maxSlide);

        if (slideLength > 0) {
            slideLength = 0;
        } else if (slideLength < maxSlideCoef) {
            slideLength = maxSlideCoef;
        }

        slideLength = Math.abs(slideLength);
        maxSlide = Math.abs(maxSlideCoef);

        img.style.backgroundPositionX = `${ -slideLength }px`;
        rotateText.innerText = `Поворот: ${ slideLength > maxSlide ? maxSlide.toFixed(1) : slideLength.toFixed(1) }px`;
    }

    /**
     * Изменение яркости
     * @param angleDiff
     * @param angle
     */
    function rotate(angleDiff, angle) {
        let brightnessText = document.querySelector('.touch__brightness');

        if (Math.abs(angleDiff - gestureState.angleDiff) > 100) {
            gestureState.startBrightness = gestureState.brightness;
            gestureState.startAngle = angle;
            gestureState.angleDiff = 0;
            return;
        }

        gestureState.angleDiff = angleDiff;
        let brightness = gestureState.startBrightness + angleDiff / 40;

        brightness = angleDiff < 0 ? Math.max(brightness, 0.1) : Math.min(brightness, 2);

        gestureState.brightness = brightness;
        img.style.filter = `brightness(${ brightness })`;
        brightnessText.innerText = `Яркость: ${ (brightness * 100).toFixed(1) }%`;
    }

    /**
     * Возвращает центральные координаты масштабируемой области
     * @param e1
     * @param e2
     * @returns {{x: number, y: number}}
     */
    function getZoomCenter(e1, e2) {
        const scale = gestureState.currentZoom / 100 ;
        const imgProps = img.getBoundingClientRect();
        const x = imgProps.width;
        const y = imgProps.height;
        const { offsetX: x1, offsetY: y1 } = e1;
        const { offsetX: x2, offsetY: y2 } = e2;
        const posX = x / 2 - ((x1 + x2) / 2) * scale;
        const posY = y / 2 - ((y1 + y2) / 2) * scale;

        return {
            x: posX,
            y: posY
        };
    }

    /**
     * Возвращает соотношение значения к текущему масштабу
     * @param value
     * @returns {number}
     */
    function getZoomRatio(value) {
        return (gestureState.currentZoom - 100) * (value / 100);
    }
    
    /**
     * Zoom области
     * @param diff
     */
    function zoom(diff) {
        let zoomText = document.querySelector('.touch__zoom'),
            zoom =  gestureState.currentZoom + diff / 20;

        zoom = diff < 0 ? Math.max(zoom, 100) : Math.min(zoom, 250);
        gestureState.currentZoom = zoom;

        const events = Object.values(eventCache);
        const zoomPos = getZoomCenter(events[0], events[1]);
        const imgW = -((img.offsetWidth));
        const imgH = -((img.offsetHeight));
        const zoomCoefX = getZoomRatio(imgW);
        const zoomCoefY = getZoomRatio(imgH) - (imgH / (gestureState.currentZoom / 50));

        if (zoomPos.x < zoomCoefX) {
            zoomPos.x = zoomCoefX;
        }
        if (zoomPos.y < zoomCoefY) {
            zoomPos.y = zoomCoefY;
        }
        if (zoomPos.x > 0) {
            zoomPos.x = 0;
        }
        if (zoomPos.y > 0) {
            zoomPos.y = 0;
        }

        img.style.backgroundPositionX = `${ zoomPos.x }px`;
        img.style.backgroundPositionY = `${ zoomPos.y }px`;
        img.style.backgroundSize = `${ zoom }%`;
        zoomText.innerText = `Приближение: ${ zoom.toFixed(1) }%`;
    }

    /**
     * Проверка на тач устройство
     * @returns {boolean}
     */
    function isTouch() {
        const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
        const mq = (query) => {
            return window.matchMedia(query).matches;
        };
        if (("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)) {
            return true;
        }
        const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
        return mq(query);
    }

    /**
     * Подписка на несколько событий
     * @param element
     * @param eventNames
     * @param callback
     */
    function addMultiEventListner(element, eventNames, callback) {
        const events = eventNames.split(' ');

        for (let i = 0; i < events.length; i++) {
            element.addEventListener(events[i], callback);
        }
    }
})();
