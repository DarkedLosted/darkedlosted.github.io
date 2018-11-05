export default class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

    /**
     * Subscribe callback on event
     * @param eventName
     * @param callback
     * @returns {EventEmitter}
     */
    subscribe(eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(callback);

        return this;
    }

    /**
     * Unsubscribe callback on event
     * @param eventName
     * @param callback
     * @returns {EventEmitter}
     */
    unsubscribe(eventName, callback) {
        if (typeof callback !== 'function') {
            throw Error('callback must be function');
        } else if (this._events === undefined) {
            return this;
        } else if (this._events[eventName] === undefined) {
            return this;
        }

        if (this._events[eventName].length > 1) {
            this._events[eventName] = this._events[eventName].filter((fn) => fn.toString() !== callback.toString());
        } else {
            delete this._events[eventName];
        }
    }

    /**
     * Call all callbacks registered on this event
     * @param eventName
     * @param payload
     */
    emit(eventName, payload) {
        const event = this._events[eventName];

        if(event) {
            event.forEach((fn) => {
                fn.call(null, payload);
            });
        }
    }
}
