'use strict';
/**
 * gesture.js для обработки жестов на тач стройствах
 */

export function initGestures() {
    if (isTouch()) {
        const img: HTMLImageElement | null = document.querySelector('.error .additions__top');
        let currentGesture = {
            prevX: 0,
            startX: 0,
        },
            eventCache: Event[] = [];

        if (img) {
            img.addEventListener('pointerdown', (event: PointerEvent) => {
                img.setPointerCapture(event.pointerId);

                eventCache.push(event);

                currentGesture.prevX = event.x;
                currentGesture.startX = event.x;
            });

            img.addEventListener('pointerup', () => {
                eventCache = [];
                currentGesture = {
                    prevX: 0,
                    startX: 0,
                };
            });

            img.addEventListener('pointermove', (event) => {
                if (eventCache.length === 2) {
                    doubleTouch(event, img);
                } else if (eventCache.length === 1) {
                    singleTouch(event, img, currentGesture);
                } else if (eventCache.length > 2) {
                    multiTouch(event, img);
                }
            });
        }
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
function getDistanceBetweenPoints(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Прокрутка(поворот) изоображения(камеры)
 * @param event
 */
function singleTouch(event: PointerEvent, img: HTMLImageElement, currentGesture: { startX: number, prevX: number }) {
    const bgPositionX = img.style.backgroundPositionX && parseInt(img.style.backgroundPositionX) || 0;
    const rotateText: HTMLElement | null = document.querySelector('.touch__rotate');
    let slideLength;

    img.style.backgroundPositionX = bgPositionX ? bgPositionX.toString() : '1px';
    slideLength = currentGesture.startX < event.clientX ?
        (bgPositionX + event.clientX * 0.1):
        (bgPositionX - event.clientX * 0.1);
    img.style.backgroundPositionX = Math.abs(parseInt(slideLength.toString())) > img.width ? img.width + 'px' : slideLength + 'px';

    if (rotateText) {
        rotateText.innerText = `Поворот: ${ Math.abs(bgPositionX) > 360 ? 360 : bgPositionX }°`;
    }
}

/**
 * Изменение яркости
 * @param event
 */
function doubleTouch(event: PointerEvent, img: HTMLImageElement) {
    let brightnessValue = (Math.atan(event.clientY / event.clientX) * 180 / Math.PI) / 100;
    const brightnessText: HTMLLabelElement | null = document.querySelector('.touch__brightness');

    brightnessValue = brightnessValue < 0.1 ? 0.1 : (brightnessValue > 2 ? 2 : brightnessValue);
    img.style.filter = `brightness(${ brightnessValue })`;

    if (brightnessText) {
        brightnessText.innerText = `Яркость: ${ brightnessValue * 100 }%`;
    }
}

/**
 * Zoom области
 * @param event
 */
function multiTouch(event: PointerEvent, img: HTMLImageElement) {
    const bgPositionX = img.style.backgroundSize && parseInt(img.style.backgroundSize) || 0;
    const zoomText: HTMLLabelElement | null = document.querySelector('.touch__zoom');

    img.style.backgroundSize = bgPositionX ?
        (bgPositionX + event.clientX)+ 'px ' + (bgPositionX + event.clientX) + 'px' : '1px';

    if (zoomText) {
        zoomText.innerText = `Приближение: ${ bgPositionX / 100 }%`;
    }
}

/**
 * Проверка на тач устройство
 * @returns {boolean}
 */
function isTouch() {
    return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0)) || true;
}
