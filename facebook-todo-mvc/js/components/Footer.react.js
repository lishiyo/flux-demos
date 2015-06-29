import React from 'react';
import TodoActions from '../actions/TodoActions';

/**
- X items left
- Clear completed
- Props: allTodos
**/

class Footer extends React.Component {
    propTypes: {
    	allTodos: React.PropTypes.object.isRequired
    }
    constructor(props) {
    	super(props); // allTodos
    }
    _getNumComplete() {
    	let n = 0;
    	let allTodos = this.props.allTodos;
    	for (let key in allTodos) {
    		if (allTodos[key].complete) {
    			n++;
    		}
    	}
    	return n;
    }
    _getNumLeft() {
    	let allTodos = this.props.allTodos;
    	// { id: {todo}, id: {todo}}
    	let numLeft = Object.keys(allTodos).length;
    	for (let key in allTodos) {
    		if (allTodos[key].complete) {
    			numLeft--;
    		}
    	}
    	return numLeft;
    }
    _isAnyComplete() {
    	console.log("any completed", this._getNumComplete());
    	return (this._getNumComplete() > 0);
    }
    _onClearCompleted() {
    	TodoActions.destroyCompleted();
    }
    render() {
    	let clearCompletedButton;
    	if (this._isAnyComplete()) {
    		clearCompletedButton = 
    			<button 
    				id="clear-completed"
    				onClick={this._onClearCompleted.bind(this)}> 
    				Clear completed ({this._getNumComplete()})
    			</button>;;
    	} 

        return (
            <footer id="footer">
            <span id="todo-count">
            	<small>{this._getNumLeft()} items left.</small>
            </span>
            {clearCompletedButton}
            </footer>
        );
    }
}

module.exports = Footer;
