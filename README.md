# darkedlosted.github.io

<h2>Yandex  home</h2>
Проект в разработке

>***Структура проекта:***
```
/icons - иконки 
/js - JavaScript файлы
/stream - видео поделенные на сегменты
/styles - стили css
index.html - входной файл проекта(главная страница)
license.pdf - Авторские права на используемые assets в проекте
package.json - зависимости проекта.
```

<h2>Рекомендации</h2>

`Node` версии не ниже `v10.12.0`

<h2>Быстрый старт</h2>

>Для запуска достаточно выполнить следущие шаги:
```
npm install
npm start
```

<h3>Задание Мультимедия</h3>
Реализована страница Видеонаблюдения в умном доме,
* на странице использются HLS видеопотоки.
на странице находятся 4 видео-превью,
* При клике разварачиваются на всю страницу.
* В состоянии открытого видео, появляются контролы для нанесения фильтров
в Real-time и кнопка возврата к странице с видео-превью.
* При наличии звукового потока в видео потоке, 
* Появляется визуализация с диаграммой анализатора громкости звука.
>Возможности:
* Переключать камеры
* Накладывать Real-time фильтры на видео

>Отладка происходила в браузере chrome версии ` 69.0.3497.100`

на Мобильном устройсте с ОС `Android`

<h3>Задание Архитектура</h3>

**How to**

_Add imports to your file_
```
import Store from './store.js'
import Dispatcher from './dispatcher.js'
```
`or in html`
```
<script type="module" src="framework/example.js"></script>
```
_Create dispatcher instance_
```
const appDispatcher = new Dispatcher();
```
_Create store instance and pass on dispatcher as argument_
```
const someStore = new Store(appDispatcher);
```
_describe your reducer and add him to store_
```
someStore.addReduce(function(action) {
    const state = this.getState();

    switch(action.type) {
        case 'CHANGE_TAB_SELECT': this.updateState({
            ...state,
            ...action.value
        });
        break;

        default: this.updateState(state);
    }
});
```
_register store_
```
appDispatcher.register(someStore);
```
All code you can find in `example.js`

**API**

* Store
    * `addChangeListener` - Add listener on store update
    * `removeChangeListener` - Remove listener on store update
    * `getState` - Return initial state of the store 
    * `updateState` - Update state in the store, and trigger event 'Change'
    * `getDispatcher` - Get connected dispatcher of the store
    * `addReduce` - Add reduce for the store, to processing actions
* Dispatcher
    * `register` - Add stores callback
    * `unregister` - Remove stores callback
    * `dispatch` - Dispatch action to all registered stores
