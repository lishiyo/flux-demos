import React from 'react';

class ChirpList extends React.Component {
  constructor(props) {
      super(props);
      console.log("chirplist", this.props);
  }
  render() {
    return (
      <div>
          got stuff 
      </div>
    )
  }
}

ChirpList.propTypes = {
  chirps: React.PropTypes.array
}

export default ChirpList;
