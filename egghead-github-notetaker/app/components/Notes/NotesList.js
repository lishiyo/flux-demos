import React from 'react';


export default class NotesList extends React.Component {
	render() {
		const notes = this.props.notes.map((note, index) => {
			return <li className="list-group-item" key={index}> { note } </li>;
		});
		return (
			<ul className="list-group">
				{ notes }
			</ul>
		);
	}
}
