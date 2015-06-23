import Dispatcher from './dispatcher';

class AppDispatcher extends Dispatcher {
    /** sits between views and dispatcher, marking action as View Action
    * @param {object} action The data coming from the view: { actionType, text }
    */
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

module.exports = AppDispatcher;
