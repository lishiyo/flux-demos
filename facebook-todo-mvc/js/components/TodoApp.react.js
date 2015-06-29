import React from 'react';

/**
* Attaches TodoStore ChangeListeners => setState(currentState)
* 
*/

let TodoStore = require('../stores/TodoStore');
let Header = require('./Header.react');
let MainSection = require('./MainSection.react');
let Footer = require('./Footer.react');

class TodoApp extends React.Component {
    constructor(props) {
        super(null);
        this.state = this.getTodoState();
    }
    componentDidMount() {
        TodoStore.addChangeListener(this._onChange.bind(this));
    }
    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange.bind(this));
    }
    _onChange() {
        this.setState(this.getTodoState());
    }
    getTodoState() {
        return {
            allTodos: TodoStore.getAll(),
            areAllComplete: TodoStore.areAllComplete()
        };
    }
    render() {
        return (
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                />
                <Footer allTodos={this.state.allTodos} />
            </div>
        );
    }
}

module.exports = TodoApp;
