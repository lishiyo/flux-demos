import React from 'react';

class UserProfile extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.username}'s Profile</h2>
                <div className="container-fluid">
                    <div className="row">
                        Name: {this.props.username}
                    </div>
                    <div className="row">
                        Bio: {this.props.bio}
                    </div>
                </div>
            </div>
        );
    }
}

/*
==== Class Methods ==== 
*/

// propTypes are class methods, not instance variables
UserProfile.propTypes = {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
}

export default UserProfile;
