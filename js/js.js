'use strict';

var data = {
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
                "image": "icons/pil.png"
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
function init() {
    var feed = document.querySelector('.feed'),
        icons = {
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
            stats: 'icons/stats.svg',
        };

    data.events.map(function(elem) {
        var template = document.importNode(tmpl, true),
            card = template.content.querySelector(".card"),
            icon = template.content.querySelector(".card__icon"),
            title = template.content.querySelector(".card__title"),
            source = template.content.querySelector(".card__source"),
            time = template.content.querySelector(".card__time"),
            description = template.content.querySelector(".card__description"),
            textDescriptionNode = document.createElement('span'),
            image = template.content.querySelector(".additions__image"),
            temperature = template.content.querySelector(".additions__temperature"),
            humidity = template.content.querySelector(".additions__humidity"),
            cardCross = card.querySelector(".card__cross"),
            top = template.content.querySelector('.additions__top'),
            cardClassList = elem.type === 'critical' ? ' error card_size_' : ' card_size_';

        card.classList += cardClassList + elem.size;
        icon.src = icons[elem.icon];
        icon.alt = elem.icon;
        title.innerHTML = elem.title;
        source.innerHTML = elem.source;
        time.innerHTML = elem.time;
        textDescriptionNode.innerHTML = elem.description;
        description.insertBefore(textDescriptionNode, description.firstChild);
        temperature.innerHTML = elem.data && elem.data.temperature ?
            'Температура: ' + (elem.data.temperature + ' C').bold() :
            '';
        humidity.innerHTML = elem.data && elem.data.temperature ? '' +
            'Влажность: ' + (elem.data.humidity + '%').bold() :
            '';
        image.src = elem.data && elem.data.image ?
            elem.data.image :
            (elem.data && elem.data.type ? 'icons/Richdata.png' : '');

        if (elem.data && elem.data.image) {
            image.style.visibility = 'hidden';
            top.style.background = `url(${elem.data.image})`;

            addTouchInfoControls(description);
        } else {
            top.remove();
        }

        elem.type === 'critical' ? cardCross.src = 'icons/cross-white.svg' : undefined;

        checkOnTextOverflow(title, elem);

        if (elem.data && elem.data.buttons) {
            elem.data.buttons.map(function(text) {
                let button = document.createElement('button');

                button.classList = 'button' + (text === 'Да' ? ' button_type_yes' : '');
                button.innerText = text;
                description.appendChild(button);
            })
        }

        if (!elem.data) {
            template.content.querySelector('.card__additions').remove();
        }

        if (elem.data && elem.data.albumcover) {
            let playerTemplate = document.importNode(pl, true),
                albumIcon = playerTemplate.content.querySelector(".player__icon"),
                trackName = playerTemplate.content.querySelector(".song__name"),
                trackLength = playerTemplate.content.querySelector(".control__slider"),
                volume = playerTemplate.content.querySelector(".controls__slider"),
                volumeValue = playerTemplate.content.querySelector(".controls__volume"),
                timeValue = playerTemplate.content.querySelector(".control__time");

            albumIcon.src = elem.data.albumcover;
            trackName.innerText = elem.data.artist + ' - ' + elem.data.track.name;
            trackLength.innerText = elem.data.track.length;
            trackLength.max = elem.data.track.length;
            volume.value = elem.data.volume;
            volumeValue.innerText = elem.data.volume + '%';
            timeValue.innerText = elem.data.track.length;

            volume.oninput = function() {
                volumeValue.innerText = volume.value + '%';
            };

            card.appendChild(playerTemplate.content);
        }

        elem.description ? undefined : description.remove();
        elem.data && (elem.data.image || elem.data.type === 'graph') ? undefined : image.remove();

        feed.appendChild(template.content)
    })
}


/**
 * Проверяем длину строки, не более 2х строк.
 * @param elem
 */
function checkOnTextOverflow(elem) {
    let text = elem.innerHTML,
        maxLength = 45,
        result = text;

    if (result.length > maxLength) {
        result = result.substr(0, maxLength) + "...";
    }

    elem.innerHTML = result;
}

/**
 * Показываем / Скрываем мобильное меню
 */
function menuToggle() {
    let menu = document.querySelector('.mobile-menu');

    if (menu.classList.contains('slide-menu-bottom') && !menu.classList.contains('slide-menu-top')) {
        menu.classList.toggle('slide-menu-bottom');
        menu.classList.toggle('slide-menu-top');
        menu.style.top = '-400px';
    } else {
        menu.classList.toggle('slide-menu-top');
        menu.classList.toggle('slide-menu-bottom');
        menu.style.top = '-35px';
    }

    menu.classList.add('slide-menu-bottom');
}

/**
 * Добавляем информационные контролы для тача
 * @param target
 */
function addTouchInfoControls(target) {
    let touchCard = document.createElement('div'),
        touchBrightness = document.createElement('div'),
        touchRotate = document.createElement('div'),
        touchZoom = document.createElement('div');

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
    target.appendChild(touchCard);
}

function initTabToggleListner() {
    let tabVideo = Array.from(document.getElementsByClassName('tab_video')),
        tabEvents = Array.from(document.getElementsByClassName('tab_events')),
        video = document.querySelector('.video-container'),
        events = document.querySelector('.events');

    tabEvents.forEach((elem) => {
        elem.onclick = function() {
            if (events.classList.contains('hidden')) {
                tabEvents.forEach((elem) => {
                    elem.classList.toggle('selected');
                });
                video.classList.toggle('hidden');
                elem.classList.toggle('selected');
                events.classList.toggle('hidden');
            }
        };
    });

    tabVideo.forEach((elem) => {
        elem.onclick = function() {
            if (video.classList.contains('hidden')) {
                tabVideo.forEach((elem) => {
                    elem.classList.toggle('selected');
                });
                video.classList.toggle('hidden');
                elem.classList.toggle('selected');
                events.classList.toggle('hidden');
            }
        }
    });
}

(function(){
    init();
    initTabToggleListner();
})();
