import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='row'>
          <h1>Chirper</h1>
        </div>
        <div className='row'>
          <div className='three columns'>
            Navigation
          </div>
          <div className='nine columns'>
            Nested Content
          </div>
        </div>
      </div>
    );
  }
}

export default App;
