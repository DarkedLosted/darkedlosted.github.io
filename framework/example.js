import Store from './store.js';
import Dispatcher from './dispatcher.js';

const appDispatcher = new Dispatcher();
const tabStore = new Store(appDispatcher);
tabStore.addReduce(function(action) {
    const state = this.getState();

    switch(action.type) {
        case 'TAB_SELECTED': this.updateState({
            ...state,
            ...action.value
        });
        break;

        default: this.updateState(state);
    }
});

appDispatcher.register(tabStore);

tabStore.addChangeListener((payload) => {
    console.log('Store updated! payload:', payload);
});

appDispatcher.dispatch({
    type: 'TAB_SELECTED',
    value: { currentTab: 'foo' }
});

appDispatcher.dispatch({
    type: 'TAB_SELECTED',
    value: { currentTab: 'bar' }
});
