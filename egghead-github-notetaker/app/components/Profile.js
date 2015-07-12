import React from 'react';
// import Router from 'react-router';
// import reactMixin from 'react-mixin';
// import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import helpers from '../utils/helpers';
import Rebase from 're-base';

import { FIREBASE_BASE } from '../config/constants';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';

const base = Rebase.createClass( FIREBASE_BASE );

class Profile extends React.Component {
    constructor(props) {
        super(props); // super is required
        this.state = {
            bio: {},
            repos: [],
            notes: []
        };
    }
    componentWillMount () {
        this.router = this.context.router;
        this.ref = new Firebase(FIREBASE_BASE);

        this.init();
    }
    componentWillUnmount () {
        console.log('component will unmount!');
        base.removeBinding(this.ref);
    }
    componentWillReceiveProps () {
        console.log('component will receive props!');
        base.removeBinding(this.ref);

        this.init();
    }
    init () {
        // whenever this endpoint changes, update notes property on our object
        const username = this.getName();
        this.ref = base.bindToState(username, {
            context: this,
            asArray: true,
            state: 'notes'
        });

        // after setting up Firebase, invoke API call
        helpers.getGithubInfo(username)
            .then(dataObj => {
                console.log('getGithubInfo', dataObj);
                this.setState({
                    repos: dataObj.repos,
                    bio: dataObj.bio
                });
            });
    }
    handleAddNote (newNote) {
        const username = this.getName();
        base.post(username, {
            data: this.state.notes.concat([newNote])
        });
    }
    getName() {
        return this.router.getCurrentParams().username;
    }
    render () {
        const username = this.getName();

        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile
                        username={username}
                        bio={this.state.bio} />
                </div>
                <div className="col-md-4">
                    <Repos username={username} repos={this.state.repos}/>
                </div>
                <div className="col-md-4">
                    <Notes
                        username={username}
                        addNote={this.handleAddNote.bind(this)}
                        notes={this.state.notes} />
                </div>
            </div>
        );
    }
}

Profile.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Profile;
