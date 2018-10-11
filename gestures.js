'use strict';
/**
 * gesture.js для обработки жестов на тач стройствах
 */

(function() {
    if (isTouch()) {
        var img = document.querySelector('.error .additions__top'),
            currentGesture = null,
            eventCache = [];

        img.addEventListener('pointerdown', (event) => {
            img.setPointerCapture(event.pointerId);

            eventCache.push(event);

            currentGesture = {
                startX: event.x,
                prevX: event.x
            }
        });

        img.addEventListener('pointerup', () => {
            eventCache = [];
            currentGesture = null;
        });

        img.addEventListener('pointermove', (event) => {
            if (eventCache.length === 2) {
                doubleTouch(event);
            } else if (eventCache.length === 1) {
                singleTouch(event);
            } else if (eventCache.length > 2) {
                multiTouch(event);
            }
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
    function singleTouch(event) {
        let bgPositionX = parseInt(img.style.backgroundPositionX) || 0,
            rotateText = document.querySelector('.touch__rotate'),
            slideLength = 0;

        img.style.backgroundPositionX = bgPositionX ? bgPositionX : '1px';
        slideLength = currentGesture.startX < event.clientX ?
            (bgPositionX + event.clientX * 0.1):
            (bgPositionX - event.clientX * 0.1);
        img.style.backgroundPositionX = Math.abs(parseInt(slideLength)) > img.width ? img.width + 'px' : slideLength + 'px';

        rotateText.innerText = `Поворот: ${ Math.abs(bgPositionX) > 360 ? 360 : bgPositionX }°`;
    }

    /**
     * Изменение яркости
     * @param event
     */
    function doubleTouch(event) {
        let brightnessValue = (Math.atan(event.clientY / event.clientX) * 180 / Math.PI) / 100,
            brightnessText = document.querySelector('.touch__brightness');

        brightnessValue = brightnessValue < 0.1 ? 0.1 : (brightnessValue > 2 ? 2 : brightnessValue);
        img.style.filter = `brightness(${ brightnessValue })`;
        brightnessText.innerText = `Яркость: ${ brightnessValue * 100 }%`;
    }

    /**
     * Zoom области
     * @param event
     */
    function multiTouch(event) {
        let bgPositionX = parseInt(img.style.backgroundSize) || 0,
            zoomText = document.querySelector('.touch__zoom');

        img.style.backgroundSize = bgPositionX ?
            (bgPositionX + event.clientX)+ 'px ' + (bgPositionX + event.clientX) + 'px' : '1px';
        zoomText.innerText = `Приближение: ${ bgPositionX / 100 }%`;
    }

    /**
     * Проверка на тач устройство
     * @returns {boolean}
     */
    function isTouch() {
        return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0)) || true;
    }
})();
