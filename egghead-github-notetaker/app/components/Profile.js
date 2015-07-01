import React from 'react';
import Router from 'react-router';

import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';

class Profile extends React.Component {
    getInitialState() {
        return {
            bio: {
                name: 'tyler'
            },
            repos: ['repo one', 'repo two'],
            notes: ['first note', 'second note'],
        }
    }
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    componentWillMount() {
        this.router = this.context.router;
    }
    render() {
        let username = this.router.getCurrentParams().username;

        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile username={username} bio={this.state.bio}/>
                </div>
                <div className="col-md-4">
                    <Repos username={username} repos={this.state.repos}/>
                </div>
                <div className="col-md-4">
                    <Notes username={username} notes={this.state.notes}/>
                </div>
            </div>
        );
    }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
