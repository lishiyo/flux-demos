import React from 'react';
import TodoTextInput from './TodoTextInput.react';
import TodoActions from '../actions/TodoActions';

class Header extends React.Component {
    _onSave(text) { // pass in text from TodoTextInput
        text = text.trim();
        if (text.length) {
            TodoActions.create(text);
            debugger;
        }
    }
    render() {
        return (
            <header>
                <h1>My Todos</h1>
                <h2>
                    <TodoTextInput
                        id="new-todo"
                        placeholder="What needs to be done?"
                        onSave={this._onSave.bind(this)} />
                </h2>
            </header>
        );
    }
}

module.exports = Header;
