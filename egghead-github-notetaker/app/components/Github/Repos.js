import React from 'react';

class Repos extends React.Component {
    render() {
        return (
            <div>
            <h2>{this.props.username}'s Repos </h2>
                <div className="container-fluid">
                    <div className="row">
                        Name: {this.props.username}
                    </div>
                    <div className="row">
                        Notes: {this.props.repos}
                    </div>
                </div>
            </div>
        );
    }
}

Repos.propTypes = {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
}

export default Repos;
