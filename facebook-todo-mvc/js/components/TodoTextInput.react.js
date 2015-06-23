import React from 'react';

const ENTER_KEY_CODE = 13;

class TodoTextInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }
    _save(){ // blur and enter
        this.props.onSave(this.state.value);
        this._refreshInput();
    }
    _onChange(){
        this.setState({
            value: event.target.value
        });
    }
    _onKeyDown(){ // on enter
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }
    _refreshInput() {
        this.setState({
            value: ''
        });
    }
    render() {
        return (
            <input
                onChange={this._onChange.bind(this)}
                onBlur={this._save.bind(this)}
                _onKeyDown={this._onKeyDown.bind(this)}
                value={this.state.value}
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
            />
        );
    }
}

TodoTextInput.defaultProps = {
    id: 'new-todo',
    className: 'todo-input'
}

module.exports = TodoTextInput;

