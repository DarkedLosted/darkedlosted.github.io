import EventEmitter from 'eventEmmiter';

export default class Store {
    constructor() {
        this._data = {};
        this._emitter = new EventEmitter();
    }

    getData() {
        return this._data;
    }

    onChange() {
        this._emitter.emit('change');
    }

    addChangeListner(callback) {
        this._emitter.addListener('change', callback);
    }

    removeChangeListner(callback) {
        this._emitter.removeListener('change', callback);
    }
}

