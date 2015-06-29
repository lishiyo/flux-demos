import React from 'react';

const ENTER_KEY_CODE = 13;
let ReactPropTypes = React.PropTypes;

class TodoTextInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value || ''
        }
    }
    propTypes: {
      onSave: ReactPropTypes.func.isRequired,
      className: ReactPropTypes.string,
      id: ReactPropTypes.string,
      placeholder: ReactPropTypes.string,
      value: ReactPropTypes.string
    }
    _save(){ // blur and enter
        this.props.onSave(this.state.value);
        this._refreshInput();
    }
    _onChange(event){
        this.setState({
            value: event.target.value
        });
    }
    _onKeyDown(event){ // on enter
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
                onKeyDown={this._onKeyDown.bind(this)}
                value={this.state.value}
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
                autoFocus={true}
            />
        );
    }
}

// TodoTextInput.defaultProps = {
//     id: 'new-todo',
//     className: 'todo-input'
// }

module.exports = TodoTextInput;

