export default class Dispatcher {
    constructor() {
        this._callbacks = {};
        this._lastId = 1;
    }

    register(callback) {
        let id = `ID_${ this._lastId++ }`;

        this._callbacks[id] = callback;

        return id;
    }

    unregister(id) {
        delete this._callbacks[id];
    }

    dispatch(payload) {
        for(let id in this._callbacks) {
            this._callbacks[id](payload);
        }
    }
}
