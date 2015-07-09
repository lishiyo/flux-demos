import React from 'react';
import Router from 'react-router';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import debug from 'debug';
import helpers from '../utils/helpers';

import { FIREBASE_BASE } from '../config/constants';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';

var Profile = React.createClass({
    mixins: [Router.State, ReactFireMixin],
    getInitialState: function() {
        return {
            bio: {
                
            },
            repos: [],
            notes: [],
        }
    },
    componentDidMount: function() {
        this.ref = new Firebase(FIREBASE_BASE);

        this.init();
    },
    componentWillUnmount: function() {
        this.unbind('notes');
    },
    componentWillReceiveProps: function() {
        console.log("component receive props!");
        // unbind notes database from this.state.notes
        this.unbind('notes');

        this.init();
    },
    init: function() {
        const username = this.getParams().username;
        const childRef = this.ref.child(username);

        // when this component mounts, bind this.state.notes with /username
        this.bindAsArray(childRef, 'notes'); //reactFireMixin method

        // after setting up Firebase, invoke API call
        helpers.getGithubInfo(username)
            .then(dataObj => {
                console.log("getGithubInfo", dataObj);
                this.setState({
                    repos: dataObj.repos,
                    bio: dataObj.bio
                });
            });
    },
    handleAddNote: function(newNote) {
        this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
    },
    render: function() {
        const username = this.getParams().username;

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
                        addNote={this.handleAddNote}
                        notes={this.state.notes} />
                </div>
            </div>
        );
    }
});

// class Profile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = this._getInitialState();
//     }
//     componentWillMount() {
//         this.router = this.context.router;
//     }
//     componentDidMount() {
//         // do all ajax requests, set up firebase listeners
//         this.ref = new Firebase(firebaseUrl);
//         debug("componentdid mount", firebaseUrl);
//     }
//     _getInitialState() {
//         return {
//             bio: {
//                 name: 'tyler'
//             },
//             repos: ['repo one', 'repo two'],
//             notes: ['first note', 'second note'],
//         }
//     }
//     render() {
//         let username = this.router.getCurrentParams().username;

//         return (
//             <div className="row">
//                 <div className="col-md-4">
//                     <UserProfile username={username} bio={this.state.bio}/>
//                 </div>
//                 <div className="col-md-4">
//                     <Repos username={username} repos={this.state.repos}/>
//                 </div>
//                 <div className="col-md-4">
//                     <Notes username={username} notes={this.state.notes}/>
//                 </div>
//             </div>
//         );
//     }
// }

// Profile.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };

// // reactMixin(Profile.prototype, Router.State);
// reactMixin(Profile.prototype, ReactFireMixin);

export default Profile;
