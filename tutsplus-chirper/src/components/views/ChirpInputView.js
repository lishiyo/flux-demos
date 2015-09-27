import React from 'react';

// Dumb Component - render a value
class ChirpInputView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='row'>
        <div className='nine columns'>
          <input className='u-full-width'
            type='text'
            placeholder='Say Something'
            value={this.props.value}
            onChange={this.props.changeHandler} />
        </div>
        <div className='three columns'>
          <button 
            className='u-full-width button-primary'
            onClick={this.props.clickHandler} >
              Chirp
          </button>
        </div>
      </div>
    );
  }
}

ChirpInputView.propTypes = {
  value: React.PropTypes.string,
  changeHandler: React.PropTypes.func.isRequired,
  clickHandler: React.PropTypes.func.isRequired,
}

export default ChirpInputView;
