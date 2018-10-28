'use strict';
import { u } from "./utils";
import { initGestures } from './gestures';

const data = {
    "events": [
        {
            "type": "info",
            "title": "Еженедельный отчет по расходам ресурсов",
            "source": "Сенсоры потребления",
            "time": "19:00, Сегодня",
            "description": "Так держать! За последнюю неделю вы потратили на 10% меньше ресурсов, чем неделей ранее.",
            "icon": "stats",
            "data": {
                "type": "graph",
                "values": [
                    {
                        "electricity": [
                            ["1536883200", 115],
                            ["1536969600", 117],
                            ["1537056000", 117.2],
                            ["1537142400", 118],
                            ["1537228800", 120],
                            ["1537315200", 123],
                            ["1537401600", 129]
                        ]
                    },
                    {
                        "water": [
                            ["1536883200", 40],
                            ["1536969600", 40.2],
                            ["1537056000", 40.5],
                            ["1537142400", 41],
                            ["1537228800", 41.4],
                            ["1537315200", 41.9],
                            ["1537401600", 42.6]
                        ]
                    },
                    {
                        "gas": [
                            ["1536883200", 13],
                            ["1536969600", 13.2],
                            ["1537056000", 13.5],
                            ["1537142400", 13.7],
                            ["1537228800", 14],
                            ["1537315200", 14.2],
                            ["1537401600", 14.5]
                        ]
                    }
                ]
            },
            "size": "l"
        },
        {
            "type": "info",
            "title": "Дверь открыта",
            "source": "Сенсор входной двери",
            "time": "18:50, Сегодня",
            "description": null,
            "icon": "key",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Уборка закончена",
            "source": "Пылесос",
            "time": "18:45, Сегодня",
            "description": null,
            "icon": "robot-cleaner",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Новый пользователь",
            "source": "Роутер",
            "time": "18:45, Сегодня",
            "description": null,
            "icon": "router",
            "size": "s"
        },
        {
            "type": "info",
            "title": "Изменен климатический режим",
            "source": "Сенсор микроклимата",
            "time": "18:30, Сегодня",
            "description": "Установлен климатический режим «Фиджи»",
            "icon": "thermal",
            "size": "m",
            "data": {
                "temperature": 24,
                "humidity": 80
            }
        },
        {
            "type": "critical",
            "title": "Невозможно включить кондиционер",
            "source": "Кондиционер",
            "time": "18:21, Сегодня",
            "description": "В комнате открыто окно, закройте его и повторите попытку",
            "icon": "ac",
            "size": "m"
        },
        {
            "type": "info",
            "title": "Музыка включена",
            "source": "Яндекс.Станция",
            "time": "18:16, Сегодня",
            "description": "Сейчас проигрывается:",
            "icon": "music",
            "size": "m",
            "data": {
                "albumcover": "https://avatars.yandex.net/get-music-content/193823/1820a43e.a.5517056-1/m1000x1000",
                "artist": "Florence & The Machine",
                "track": {
                    "name": "Big God",
                    "length": "4:31"
                },
                "volume": 80
            }
        },
        {
            "type": "info",
            "title": "Заканчивается молоко",
            "source": "Холодильник",
            "time": "17:23, Сегодня",
            "description": "Кажется, в холодильнике заканчивается молоко. Вы хотите добавить его в список покупок?",
            "icon": "fridge",
            "size": "m",
            "data": {
                "buttons": ["Да", "Нет"]
            }
        },
        {
            "type": "info",
            "title": "Зарядка завершена",
            "source": "Оконный сенсор",
            "time": "16:22, Сегодня",
            "description": "Ура! Устройство «Оконный сенсор» снова в строю!",
            "icon": "battery",
            "size": "s"
        },
        {
            "type": "critical",
            "title": "Пылесос застрял",
            "source": "Сенсор движения",
            "time": "16:17, Сегодня",
            "description": "Робопылесос не смог сменить свое местоположение в течение последних 3 минут. Похоже, ему нужна помощь.",
            "icon": "cam",
            "data": {
                "image": "icons/pil-2x.jpg"
            },
            "size": "l"
        },
        {
            "type": "info",
            "title": "Вода вскипела",
            "source": "Чайник",
            "time": "16:20, Сегодня",
            "description": null,
            "icon": "kettle",
            "size": "s"
        }
    ]
};

/**
 * Шаблонизируем данные из JSON
 */
export function init() {
    const feed = u.getElement('.feed');
    const tmpl = u.getElement('.tmpl') as HTMLTemplateElement;
    const icons: { [path: string]: string } = u.getIcons();

    // fetch('http://localhost:8000/api/events') // закомментировал, т.к. еще не проверили верстку...
    //     .then(data => {
    //         return data.json()
    //     })
    //     .then(res => {
            data.events.map((elem) => {
                const template = document.importNode(tmpl, true);

                    const card = u.getElement(".card", template.content);
                    const icon = template.content.querySelector<HTMLImageElement>(".card__icon");
                    const title = u.getElement(".card__title", template.content);
                    const source = u.getElement(".card__source", template.content);
                    const time = template.content.querySelector<HTMLTimeElement>(".card__time");
                    const description = u.getElement(".card__description", template.content);
                    const textDescriptionNode = document.createElement('span');
                    const image = template.content.querySelector<HTMLImageElement>(".additions__image");
                    const temperature = u.getElement(".additions__temperature", template.content);
                    const humidity = u.getElement(".additions__humidity", template.content);
                    const cardCross = card && card.querySelector<HTMLImageElement>(".card__cross");
                    const top = u.getElement('.additions__top', template.content);
                    // const cardClassList = elem.type === 'critical' ? 'error card_size_' : 'card_size_';

                    description && description.insertBefore(textDescriptionNode, description.firstChild);

                    if (elem.type === 'critical' && card) {
                        card.classList.add('error');
                        card.classList.add('card_size_' + elem.size);
                    } else {
                        card && card.classList.add('card_size_' + elem.size);
                    }
                    if (icon) {
                        icon.src = icons[elem.icon];
                        icon.alt = elem.icon;
                    }
                    if (source) {
                        source.innerHTML = elem.source;
                    }
                    if (time) {
                        time.innerHTML = elem.time;
                    }
                    if (title) {
                        title.innerHTML = elem.title;
                    }
                    if (elem.data && elem.data.temperature && elem.data.humidity && temperature && humidity) {
                        temperature.innerHTML = `Температура: ${ (`${elem.data.temperature } C`).bold()}`;
                        humidity.innerHTML = `${'Влажность: '}${ (`${elem.data.humidity }%`).bold()}`;
                    } else {
                        humidity && humidity.remove();
                        temperature && temperature.remove();
                    }


                    if (elem.description) {
                        textDescriptionNode.innerHTML = elem.description;
                    }


                    if (elem.data && elem.data.image && image && top) {
                        image.src = elem.data.image;
                        image.setAttribute('srcset', 'icons/pil.jpg 832w 1x, icons/pil-3x.jpg 2496w 3x');
                        image.setAttribute('sizes', '(max-width: 620px) 832px, (min-width: 1400) 2496px');
                        image.style.visibility = 'hidden';
                        top.style.background = `url(${elem.data.image})`;

                        addTouchInfoControls(description);
                    } else {
                        if (image) {
                            image.src = (elem.data && elem.data.type ? 'icons/Richdata.jpg' : '');
                        }

                        top && top.remove();
                    }

                    if (elem.type === 'critical' && cardCross) {
                        cardCross.src = 'icons/cross-white.svg'
                    }
                    // checkOnTextOverflow(elem);

                    if (elem.data && elem.data.buttons) {
                        elem.data.buttons.map((text) => {
                            const button = document.createElement('button');

                            button.classList.add('button');

                            if (text === 'Да') {
                                button.classList.add('button_type_yes');
                            }

                            button.innerText = text;
                            description && description.appendChild(button);
                        });
                    }

                    if (!elem.data) {
                        const cardAdditions = u.getElement('.card__additions', template.content);
                        cardAdditions && cardAdditions.remove();
                    }

                    if (elem.data && elem.data.albumcover) {
                        const pl = document.querySelector('.pl') as HTMLTemplateElement;
                        const playerTemplate = document.importNode(pl, true);
                        const albumIcon = playerTemplate.content.querySelector<HTMLImageElement>(".player__icon");
                        const trackName = u.getElement(".song__name", playerTemplate.content);
                        const trackLength = playerTemplate.content.querySelector<HTMLInputElement>(".control__slider");
                        const volume = playerTemplate.content.querySelector<HTMLInputElement>(".controls__slider");
                        const volumeValue = u.getElement(".controls__volume", playerTemplate.content);
                        const timeValue = u.getElement(".control__time", playerTemplate.content);

                        if (albumIcon) {
                            albumIcon.src = elem.data.albumcover;
                        }
                        if (trackName) {
                            trackName.innerText = `${elem.data.artist } - ${ elem.data.track && elem.data.track.name}`;
                        }
                        if (timeValue && elem.data.track) {
                            timeValue.innerText = elem.data.track && elem.data.track.length;
                        }
                        if (trackLength && elem.data.track) {
                            trackLength.innerText = elem.data.track.length;
                            trackLength.max =  elem.data.track.length;
                        }
                        if (volume && volumeValue && elem.data.volume) {
                            volume.value = elem.data.volume.toString();
                            volumeValue.innerText = `${elem.data.volume }%`;

                            volume.oninput = () => {
                                volumeValue.innerText = `${volume.value }%`;
                            };
                        }

                        card && card.appendChild(playerTemplate.content);
                    }

                    if (!elem.description) {
                        description && description.remove();
                    }
                    if (elem.data && !(elem.data.image || elem.data.type === 'graph')) {
                        image && image.remove();
                    }

                    feed && feed.appendChild(template.content);

                    loadGesturesScript(); // ждем ответа от сервера с events
            });
        // })
       // .then(() => loadGesturesScript()); // ждем ответа от сервера с events
}

/**
 * Подключаем скрипт обработки жестов
 */
function loadGesturesScript() {
    // const script = document.createElement('script');
    //
    // script.src = "js/gestures.js";
    // document.getElementsByTagName('head')[0].appendChild(script);
    initGestures();
}

/**
 * Проверяем длину строки, не более 2х строк.
 * @param elem
 */
function checkOnTextOverflow(elem: HTMLElement | null) {
    if (!elem) {
        return;
    }

    const text = elem.innerHTML;
    const maxLength = 45;
    let result = text;

    if (result.length > maxLength) {
        result = `${result.substr(0, maxLength) }...`;
    }

    elem.innerHTML = result;
}

/**
 * Показываем / Скрываем мобильное меню
 */
function menuToggle() {
    const menu: HTMLElement | null = document.querySelector('.mobile-menu');

    if (menu && menu.classList.contains('slide-menu-bottom') && !menu.classList.contains('slide-menu-top')) {
        menu.classList.toggle('slide-menu-bottom');
        menu.classList.toggle('slide-menu-top');
        menu.style.top = '-400px';
    } else if (menu) {
        menu.classList.toggle('slide-menu-top');
        menu.classList.toggle('slide-menu-bottom');
        menu.style.top = '-35px';
    }

    menu && menu.classList.add('slide-menu-bottom');
}

/**
 * Добавляем информационные контролы для тача
 * @param target
 */
function addTouchInfoControls(target: HTMLElement | null) {
    const touchCard = document.createElement('div');
    const touchBrightness = document.createElement('div');
    const touchRotate = document.createElement('div');
    const touchZoom = document.createElement('div');

    touchZoom.innerText = 'Приближение: 100%';
    touchBrightness.innerText = 'Яркость: 100%';
    touchRotate.innerText = 'Поворот: 100°';

    touchCard.className = 'card__touch';
    touchZoom.className = 'touch__zoom';
    touchBrightness.className = 'touch__brightness';
    touchRotate.className = 'touch__rotate';

    touchCard.appendChild(touchBrightness);
    touchCard.appendChild(touchRotate);
    touchCard.appendChild(touchZoom);
    target && target.appendChild(touchCard);
}

export function initTabToggleListner() {
    const tabVideo = Array.from(document.getElementsByClassName('tab_video'));
    const tabEvents = Array.from(document.getElementsByClassName('tab_events'));
    const video = document.querySelector('.video-container');
    const events = document.querySelector('.events');

    tabEvents.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (video && events && events.classList.contains('hidden')) {
                tabEvents.forEach((tab) => {
                    tab.classList.toggle('selected');
                });
                video.classList.toggle('hidden');
                elem.classList.toggle('selected');
                events.classList.toggle('hidden');
            }
        });
    });

    tabVideo.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (video && events && video.classList.contains('hidden')) {
                tabVideo.forEach((tab) => {
                    tab.classList.toggle('selected');
                });
                video.classList.toggle('hidden');
                elem.classList.toggle('selected');
                events.classList.toggle('hidden');
            }
        });
    });
}
//
// (() => {
//     init();
//     initTabToggleListner();
// })();
