import React from 'react';

class ChirpList extends React.Component {
    static propTypes = {
      chirps: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        console.log("chirplist got: ", this.props.chirps);
    }

    render() {
        return (
            <div>got stuff
            </div>
        );
    }
}

export default ChirpList;
