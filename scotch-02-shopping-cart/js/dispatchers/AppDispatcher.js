import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

// Convenience method wraps view actions' payloads as 'action'
// Keep server-side/API actions distinct from view actions
AppDispatcher.handleAction = function(action) {
	this.dispatch({
		source: 'VIEW_ACTION',
		action: action
	});
};

export default AppDispatcher;
