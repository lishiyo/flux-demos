import React from 'react';
// View layer
import ChirpInputView from '../views/ChirpInputView';

class ChirpInput extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      value: ''
    };
    // set handler shortcuts
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleClick(event) {
    // call onSave handler
    this.props.onSave(this.state.value);

    this.setState({
      value: ''
    });
  }
  render() {
    return (
      <ChirpInputView
        value={this.state.value}
        onChange={this.handleChange}
        onClick={this.handleClick} />
      // <div className='row'>
      //   <div className='nine columns'>
      //     <input className='u-full-width'
      //       type='text'
      //       placeholder='Say Something'
      //       value={this.state.value}
      //       onChange={this.handleChange} />
      //   </div>
      //   <div className='three columns'>
      //     <button 
      //       className='u-full-width button-primary'
      //       onClick={this.handleClick}>
      //         Chirp
      //     </button>
      //   </div>
      // </div>
    );
  }
}

export default ChirpInput;
