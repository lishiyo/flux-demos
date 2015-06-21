let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let TodoConstants = require('../constants/TodoConstants');

let CHANGE_EVENT = 'change';

let _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */

function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 99999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    }
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */

function update(id, updates) {
    _todos[id] = Object.assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */

function updateAll(updates) {
    // for...in loops over keys, for...of loops over values
    for (let id in _todos) {
        update(id, updates);
    }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */

function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

class TodoStore extends EventEmitter {
    /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll() {
    return _todos;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case TodoConstants.TODO_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          TodoStore.emitChange();
        }
        break;

      case TodoConstants.TODO_DESTROY:
        destroy(action.id);
        TodoStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
}

// AppDispatcher.register(function(action) {
//     let text;

//     switch(action.actionType) {
//     case TodoConstants.TODO_CREATE:
//       text = action.text.trim();
//       if (text !== '') {
//         create(text);
//         TodoStore.emitChange();
//       }
//       break;

//     case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
//       if (TodoStore.areAllComplete()) {
//         updateAll({complete: false});
//       } else {
//         updateAll({complete: true});
//       }
//       TodoStore.emitChange();
//       break;

//     case TodoConstants.TODO_UNDO_COMPLETE:
//       update(action.id, {complete: false});
//       TodoStore.emitChange();
//       break;

//     case TodoConstants.TODO_COMPLETE:
//       update(action.id, {complete: true});
//       TodoStore.emitChange();
//       break;

//     case TodoConstants.TODO_UPDATE_TEXT:
//       text = action.text.trim();
//       if (text !== '') {
//         update(action.id, {text: text});
//         TodoStore.emitChange();
//       }
//       break;

//     case TodoConstants.TODO_DESTROY:
//       destroy(action.id);
//       TodoStore.emitChange();
//       break;

//     case TodoConstants.TODO_DESTROY_COMPLETED:
//       destroyCompleted();
//       TodoStore.emitChange();
//       break;

//     default:
//       // no op
//   }
// });

module.exports = TodoStore;
