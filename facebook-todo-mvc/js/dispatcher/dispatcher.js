/** Dispatcher class with register and dispatch methods */
//require("babel/polyfill");


let _callbacks = [];
let _promises = [];

class Dispatcher {
/**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback The callback to be registered.
   * @return {number} The index of the callback within the _callbacks array.
   */
  register(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1;
  }
  /**
   * dispatch
   * @param  {object} payload The data from the action 
   * { source: 'VIEW_ACTION', action: { actionType, text }  }
   * TodoStore logic => emitChange => eventListener callbacks => todoApp._onChange();
   */
  dispatch(payload) {
    let resolves = [];
    let rejects = [];
    _promises = _callbacks.map((_, i) => {
        return new Promise(function(resolve, reject) {
            console.log("++ dispatch promise: ", payload, resolve, reject);
            resolves[i] = resolve;
            rejects[i] = reject;
        });
    });
    // Dispatch to callbacks and resolve/reject promises
    _callbacks.forEach((callback, idx) => {
        // Callback can return an object to resolve or a promise to chain
        Promise.resolve(callback(payload)).then(function() {
            resolves[idx](payload);
        }, function() {
            rejects[idx](new Error('dispatcher callback failed'));
        });
    });

    _promises = [];
  }
}

module.exports = Dispatcher;
