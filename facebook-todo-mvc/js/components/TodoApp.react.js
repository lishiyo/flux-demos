import React from 'react';

let TodoStore = require('../stores/TodoStore');
let Header = require('./Header.react');
let MainSection = require('./MainSection.react');
let Footer = require('./Footer.react');

function getTodoState() {
    return {
        allTodos: TodoStore.getAll(),
        areAllComplete: TodoStore.areAllComplete()
    };
}

class TodoApp extends React.Component {
    constructor(props) {
        super(null);
        this.state = getTodoState();
    }
    componentDidMount() {
        TodoStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState(getTodoState());
    }
    render() {
        return (
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                />
                <Footer allTodos={this.state.AllTodos} />
            </div>
        );
    }
}

module.exports = TodoApp;
