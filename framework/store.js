import EventEmitter from './eventEmmiter.js';
import Dispatcher from './dispatcher.js';

export default class Store {
    constructor(dispatcher) {
        this.reduce = () => {};

        this._state = {};
        this._emitter = new EventEmitter();
        this._dispatcher = dispatcher || new Dispatcher();
    }

    /**
     * Return current store state(data)
     * @returns {{}|*}
     */
    getState() {
        return this._state;
    }

    /**
     * Return initial state of the store
     * @returns {{}}
     */
    getInitialState() {
        return {};
    }

    /**
     * Update state in the store, and trigger event 'Change'
     * @param state
     */
    updateState(state) {
        this._state = state;
        this._hasChange();
    }

    /**
     * Add reduce for the store, to processing actions
     * @param reduce
     * @returns {Store.reduce|*}
     */
    addReduce(reduce) {
        this.reduce = reduce.bind(this);

        return this.reduce;
    }

    /**
     * Get connected dispatcher of the store
     * @returns {*|Dispatcher}
     */
    getDispatcher() {
        return this._dispatcher;
    }

    /**
     * Trigger 'change' event for all subscribers
     */
    _hasChange() {
        this._emitter.emit('change');
    }

    /**
     * Add listener on store update
     * @param callback
     */
    addChangeListener(callback) {
        this._emitter.subscribe('change', callback);
    }

    /**
     * Remove listener on store update
     * @param callback
     */
    removeChangeListener(callback) {
        this._emitter.unsubscribe('change', callback);
    }
}

