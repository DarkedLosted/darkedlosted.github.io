import Store from './store.js';
import Dispatcher from './dispatcher.js';

const appDispatcher = new Dispatcher();
const someStore = new Store(appDispatcher);
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

appDispatcher.register(someStore);

someStore.addChangeListener(() => {
    console.log('realyl work!');
});


appDispatcher.dispatch({
    type: 'CHANGE_TAB_SELECT',
    value: { currentTab: '.div' }
});

appDispatcher.dispatch({
    type: 'CHANGE_TAB_SELECT',
    value: { asd: 'sds' }
});

console.log(appDispatcher);
console.log(someStore);
console.log(someStore.getState());
