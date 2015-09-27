import { EventEmitter } from 'events';
import { assign, find } from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE';

let baseMethods = {
    init() {},
    getState () { // current state
        return { chirps: this.all() }; 
    },
    set (arr) {
        let currIds = this._data.map(m => m.cid);
        arr.filter(item => {
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));

        console.log("data set! ++ ", this._data);
    },
    add (item) {
        console.log("store add ++ ", item);
        this._data.push(item);
    },
    all () {
        return this._data;
    },
    get (id) {
        return find(this._data, (item) => {
            return item.cid === id;
        });
    },
    addChangeListener (fn) {
        this.on(CHANGE_EVENT, fn); // EventEmitter
    },
    removeChangeListener (fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange () {
        this.emit(CHANGE_EVENT);
    },
    bindAction (actionType, actionFn) { // create actions hash
        // { actionType: [ actionFn, actionFn... ] }
        if (this.actions[actionType]) {
            this.actions[actionType].push(actionFn);
        } else {
            this.actions[actionType] = [actionFn];
        }
    },  
};

function createStore(methods) {
    let store = {
        _data: [],
        actions: {}
    };

    // Compose store out of: 
    // - EventEmitter's prototype functions, 
    // - base store methods
    // - custom methods
    assign(store, EventEmitter.prototype, baseMethods, methods);

    // populate store.actions hash with action handlers
    store.init();

    // register a callback to dispatch events
    dispatcher.register(action => {
        // if my store responds to this ACTION_TYPE 
        // trigger all action handlers for that action type
        if (store.actions[action.actionType]) {
            store.actions[action.actionType].forEach(fn => {
                fn.call(store, action.data);
            });
        };
    });

    return store;
}

export default createStore;

