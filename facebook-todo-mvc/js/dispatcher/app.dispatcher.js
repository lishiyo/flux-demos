import Dispatcher from './dispatcher';

/** Sits between TodoActionds nad TodoStore
 * @param {object} action The data coming from the view:
*/

class AppDispatcher extends Dispatcher {
    
    //  This abstraction is helpful if you are looking to distinguish between view triggered actions v.s. server/API triggered actions
    // Dispatch will broadcast the `action` payload to all of its registered callbacks
    handleViewAction(action) {
    	console.log("AppDispatcher handleViewAction dispatching:", action);
    	
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action // { actionType, text }
        });
    }
}

module.exports = new AppDispatcher();
