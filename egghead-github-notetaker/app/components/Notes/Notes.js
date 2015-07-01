import React from 'react';

class Notes extends React.Component {
    render() {
        return (
            <div>
                <h2>Notes</h2>
                <div className="container-fluid">
                    <div className="row">
                        Name: {this.props.username}
                    </div>
                    <div className="row">
                        Notes: {this.props.notes}
                    </div>
                </div>
            </div>
        );
    }
}

Notes.propTypes = {
    username: React.PropTypes.string.isRequired,
    notes: React.PropTypes.array.isRequired
}

export default Notes;
