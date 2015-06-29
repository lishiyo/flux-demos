import React from 'react';
import TodoItem from './TodoItem.react';
import TodoActions from '../actions/TodoActions';

/***
No state - passed in {_todos} in this.props.allTodos
**/
class MainSection extends React.Component {
    propTypes: {
    	allTodos: React.PropTypes.object.isRequired,
    	areAllComplete: React.PropTypes.bool.isRequired
    }
    _onToggleCompleteAll(event) {
    	TodoActions.toggleCompleteAll();
    }
    render() {
    	let todoItems = [];
    	let allTodos = this.props.allTodos;

    	for (let id in allTodos) {
    		let todoItem = 
    		<TodoItem 
    			key={id} 
    			todo={allTodos[id]}
    		/>;
    		todoItems.push(todoItem);
    	}

        return (
        	<section id="main">
        		<input 
        			id="toggle-all"
        			type="checkbox"
        			onChange={this._onToggleCompleteAll.bind(this)}
        			checked={this.props.areAllComplete}
        		/>
	            <label htmlFor="toggle-all">
	            	Mark all as complete
	            </label>
		        <ul id="todo-list">
		        	{todoItems}
		        </ul>
	        </section>
        );
    }
}

module.exports = MainSection;
