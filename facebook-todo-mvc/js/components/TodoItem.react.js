import React from 'react';
import classNames from 'classnames';
import TodoTextInput from './TodoTextInput.react';
import TodoActions from '../actions/TodoActions';

/**
this.props = key, todo
_todos[id] = {
    id: id,
    complete: false,
    text: text
  };
 State - Editing
**/

class TodoItem extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isEditing: false
		};
	}
	_toggleComplete(todo, event) {
		TodoActions.toggleComplete(this.props.todo);
	}
	_editTodo(event) {
		this._toggleEditing();
	}
	_onSave(text) {
		TodoActions.updateText(this.props.todo.id, text);
		this._toggleEditing();
	}
	_onDestroy() {
		TodoActions.destroy(this.props.todo.id);
	}
	_toggleEditing() {
		this.setState({
			isEditing: !this.state.isEditing
		});
	}
    render() {
    	var input;
    	var todo = this.props.todo;
    	var classes = classNames({
    		'completed': todo.complete,
    		'editing': this.state.isEditing
    	});

    	if (this.state.isEditing) {
    		input =
    		  <TodoTextInput
    		    className="edit"
    		    onSave={this._onSave.bind(this)}
    		    value={todo.text}
    		  />;
    	}

        return (
        	<li 
        	className={classes}
    		key={todo.id}>
    		<div className="view">
    			<input 
    				className="toggle"
    				type="checkbox"
    				checked={todo.complete}
    				onChange={this._toggleComplete.bind(this, todo)}
    			/>
	    		<label onDoubleClick={this._editTodo.bind(this)}>
	    			{todo.text}
	    		</label>
	    		<button 
	    			className="destroy" 
	    			onClick={this._onDestroy.bind(this)} 
	    		/>
	    	</div>
        	{input}
        	</li>
        );
    }
}

module.exports = TodoItem;
