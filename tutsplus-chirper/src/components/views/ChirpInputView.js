import React from 'react';

// Dumb Component

class ChirpInputView extends React.Component {
  static propTypes = {
    value: React.PropTypes.string
    onChange: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

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
            onChange={this.props.onChange} />
        </div>
        <div className='three columns'>
          <button 
            className='u-full-width button-primary'
            onClick={this.props.onClick}>
              Chirp
          </button>
        </div>
      </div>
    );
  }
}

export default ChirpInputView;
