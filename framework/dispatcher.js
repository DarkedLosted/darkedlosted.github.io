export default class Dispatcher {
    constructor() {
        this._callbacks = {};
        this._lastId = 1;
    }

    /**
     * Add stores callback
     * @param callback
     * @returns {string}
     */
    register(callback) {
        let id = `ID_${ this._lastId++ }`;

        this._callbacks[id] = callback.reduce;

        return id;
    }

    /**
     * Remove stores callback
     * @param id
     */
    unregister(id) {
        delete this._callbacks[id];
    }

    /**
     * Dispatch action to all registered stores
     * @param payload
     */
    dispatch(payload) {
        for(let id in this._callbacks) {
            this._callbacks[id](payload);
        }
    }
}
