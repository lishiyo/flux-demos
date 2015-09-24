import React from 'react';
import actions from '../actions/actions';

// Stores
import ChirpStore from '../stores/chirps';

// Sub-components
import ChirpInput from './ChirpInput';
import ChirpList from './ChirpList';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = ChirpStore.getState(); 

    this.saveChirp = this.saveChirp.bind(this);
  }
  saveChirp(text) {
    actions.chirp(text);
    // dispatcher.dispatch({
    //     actionType: CHIRP,
    //     data: data
    // })
  }
  render() {
    return (
      <div>
        <ChirpInput onSave={this.saveChirp} />
        <ChirpList chirps={this.state.chirps} />
      </div>
    );
  }
}

export default Home;
