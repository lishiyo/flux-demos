import { EventEmitter } from 'events';
import { assign, find } from 'lodash';
import dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE';

let storeMethods = {
    init: function() {},
    set: function(arr) {
        let currIds = this._data.map(m => m.cid);
        arr.filter(item => {
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));

        console.log("data set", this._data);
    },
    add: function(item) {
        this._data.push(item);
    },
    all: function() {
        return this._data;
    },
    get: function(id) {
        return find(this._data, (item) => {
            return item.cid === id;
        });
    },
    addChangeListener: function (fn) {
        this.on(CHANGE_EVENT, fn); // EventEmitter
    },
    removeChangeListener: function (fn) {
        this.removeListener(CHANGE_EVENT, fn);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    bind: function(actionType, actionFn) { // bind to actions
        // { actionType: [ actionFn, actionFn... ] }
        if (this.actions[actionType]) {
            this.actions[actionType].push(actionFn);
        } else {
            this.actions[actionType] = [actionFn];
        }
    }
};

function extend(methods) {
    let store = {
        _data: [],
        actions: {}
    };

    // Compose store
    // EventEmitter's prototype functions, default storeMethods, and custom methods
    assign(store, EventEmitter.prototype, storeMethods, methods);

    // populate store.actions hash with action handlers
    store.init();

    // register a function
    dispatcher.register(action => {
        // if my store responds to this ACTION_TYPE 
        // trigger all action handlers
        if (store.actions[action.actionType]) {
            store.actions[action.actionType].forEach(fn => {
                fn.call(store, action.data);
            });
        };
    });

    return store;
}

export default extend;
