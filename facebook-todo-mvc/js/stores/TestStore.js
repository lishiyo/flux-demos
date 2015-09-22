import AppDispatcher from '../dispatcher/app.dispatcher';
import TestConstants from '../constants/TestConstants';
import TodoStore from './TodoStore';
import { EventEmitter } from 'events';

const TestStore = Object.assign({}, EventEmitter.prototype, {
	init: function() {
		console.log("TestStore init! ++++ ");
	}
});

TestStore.dispatcherIndex = AppDispatcher.register(function(action) {
	console.log("registering TestStore callback! action: ", action);
	AppDispatcher.waitFor([
		TodoStore.dispatcherIndex
	], function() {
		TestStore.init();
	});

	return true;
});

module.exports = TestStore;
