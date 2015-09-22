let AppDispatcher = require('../dispatcher/app.dispatcher');
let TodoConstants = require('../constants/TodoConstants');
let EventEmitter = require('events').EventEmitter;
let merge = require('merge');

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
    };
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
    // for...in loops over keys, for...of loops over values (use for arrays)
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

// TodoStore - Singleton with static functions

const TodoStore = merge(EventEmitter.prototype, {
  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
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
  getAll: function() {
    return _todos;
  },

  /** @return {boolean} - true if event had listeners, false others */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

/** ==== Register TodoStore with Dispatcher ====  **/

/**
 * Call AppDispatcher.register(callback) immediately -> [callback]
 * @param payload = 
  { source: 'VIEW_ACTION',
      action: {
        actionType: TODO_CREATE,
        text: "some text"
      }
    }

  Actual create/destroy logic lives here. 
  emitChange => triggers listener callbacks
  Need to store dispatcherIndex to utilize Dispatcher#waitFor
**/

TodoStore.dispatcherIndex = AppDispatcher.register(function(action) {
    let text;
    console.log("TodoStore's registered callback ++", action);

    const actionList = [TodoConstants.TODO_CREATE, TodoConstants.TODO_DESTROY, TodoConstants.TODO_UPDATE_TEXT, TodoConstants.TODO_COMPLETE, TodoConstants.TODO_UNDO_COMPLETE, TodoConstants.TODO_TOGGLE_COMPLETE_ALL, TodoConstants.TODO_DESTROY_COMPLETED];

    const actions = {
      [TodoConstants.TODO_CREATE]: function() {
        if (action.text) {
          text = action.text.trim();
          create(text);
          TodoStore.emitChange();

          return true;
        }
      },
      [TodoConstants.TODO_DESTROY]: function() {
        destroy(action.id);
        TodoStore.emitChange();

        return true;
      },
      [TodoConstants.TODO_DESTROY]: function() {
        destroy(action.id);
        TodoStore.emitChange();

        return true;
      },
      [TodoConstants.TODO_UPDATE_TEXT]: function() {
        if (action.text) {
          text = action.text.trim();
          update(action.id, { text: text});
          TodoStore.emitChange();
        }

        return true;
      },
      [TodoConstants.TODO_COMPLETE]: function() {
        update(action.id, { complete: true });
        TodoStore.emitChange();

        return true;
      },
      [TodoConstants.TODO_UNDO_COMPLETE]: function() {
        update(action.id, { complete: false });
        TodoStore.emitChange();

        return true;
      },
      [TodoConstants.TODO_DESTROY_COMPLETED]: function() {
        destroyCompleted();
        TodoStore.emitChange();

        return true;
      }
    };

    if (typeof actions[action.actionType] !== 'function') {
      throw new Error('Invalid action.');
    }

    return actions[action.actionType]();
});

module.exports = TodoStore;
