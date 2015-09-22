import React from 'react';
import TodoTextInput from './TodoTextInput.react';
import TodoActions from '../actions/TodoActions';

class Header extends React.Component {
    _onSave(text) { // pass in value from TodoTextInput
        if (text.trim()) {
            TodoActions.create(text);
        }
    }
    render() {
        return (
            <header id="header">
                <h1>My Todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this._onSave.bind(this)} />
            </header>
        );
    }
}

module.exports = Header;
