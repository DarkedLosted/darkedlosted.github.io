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
                brightness: 1
            };

        img.addEventListener('pointerdown', (event) => {

            eventCache[event.pointerId] = event;

            currentGesture = {
                startX: event.clientX
            };
        });

        img.addEventListener('pointermove', (event) => {
            const pointersCount = Object.keys(eventCache).length;

            if (pointersCount === 0 || !currentGesture) {
                return;
            }

            if (pointersCount === 2) {
                eventCache[event.pointerId] = event;
                const events = Object.values(eventCache);
                let curDiff = getDistanceBetweenPoints(events[0].clientX, events[0].clientY, events[1].clientX, events[1].clientY),
                    angle = (180 + Math.round(Math.atan2(events[1].clientX - events[0].clientX, events[1].clientY - events[0].clientY) * 180 / Math.PI));

                if (!gestureState.startDist) {
                    gestureState.startDist = curDiff;
                }
                if (!gestureState.startAngle) {
                    gestureState.startAngle = angle;
                }

                curDiff = curDiff - gestureState.startDist;
                let angleDiff = angle - gestureState.startAngle;

                if(Math.abs(curDiff) > 16) {
                    zoom(curDiff);
                } else {
                    rotate(angleDiff, angle);
                }
            } else if (pointersCount === 1 ) {
                const prevEvent = eventCache[event.pointerId];
                const xDiff = event.clientX - prevEvent.clientX;

                singleTouch(event, xDiff);

                eventCache[event.pointerId] = event;
            }
        });

        addMultiEventListner(img, 'pointerup pointercancel pointerout pointerleave', (e) => {
            currentGesture = null;
            delete eventCache[e.pointerId];
        });
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
            maxSlide = -((img.offsetWidth * 2) - img.parentNode.offsetWidth / 2 );

        if (slideLength > 0) {
            slideLength = 0;
        } else if (slideLength < maxSlide) {
            slideLength = maxSlide;
        }

        slideLength = Math.abs(slideLength);
        maxSlide = Math.abs(maxSlide);

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

        if (Math.abs(angleDiff - gestureState.angleDiff) > 200) {
            gestureState.startBrightness = gestureState.brightness;
            gestureState.startAngle = angle;
            gestureState.angleDiff = 0;
            return;
        }

        gestureState.angleDiff = angleDiff;

        let brightness = gestureState.startBrightness + angleDiff / 50;

        brightness = angleDiff < 0 ? Math.max(brightness, 0.1) : Math.min(brightness, 2);

        gestureState.brightness = brightness;
        img.style.filter = `brightness(${ brightness })`;
        brightnessText.innerText = `Яркость: ${ (brightness * 100).toFixed(1) }%`;
    }

    /**
     * Zoom области
     * @param diff
     */
    function zoom(diff) {
        let zoomText = document.querySelector('.touch__zoom'),
            zoom = 100 + diff;

        zoom = diff < 0 ? Math.max(zoom, 100) : Math.min(zoom, 250);
        img.style.backgroundSize = `${zoom}%`;
        zoomText.innerText = `Приближение: ${ zoom.toFixed(1) }%`;
    }

    /**
     * Проверка на тач устройство
     * @returns {boolean}
     */
    function isTouch() {
        return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0)) || true;
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
