import Dispatcher from './dispatcher';

/** Sits between TodoActionds nad TodoStore
 * @param {object} action The data coming from the view: 
*/

class AppDispatcher extends Dispatcher {
    
    handleViewAction(action) {
    	console.log("handleViewAction");
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action // { actionType, text }
        });
    }
}

module.exports = new AppDispatcher();
