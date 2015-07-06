import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

class Notes extends React.Component {
    render() {
        return (
            <div>
                <h2>Notes for {this.props.username}</h2>
                <div className="container-fluid">
                    <div className="row">
                        Notes:
                    </div>
                </div>
                <AddNote username={this.props.username} 
                        addNote={this.props.addNote} />
                <NotesList notes={this.props.notes} />
            </div>
        );
    }
}

Notes.propTypes = {
    username: React.PropTypes.string.isRequired,
    notes: React.PropTypes.array.isRequired,
    addNote: React.PropTypes.func.isRequired
}

export default Notes;
