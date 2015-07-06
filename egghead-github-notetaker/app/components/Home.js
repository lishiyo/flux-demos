import React from 'react';

class Home extends React.Component {
	constructor(props) {
		super(props);
		// debug('Home with ...this.props from Main', this.props);	
	}
    render() {
        return (
            <div>
                <h2 className="text-center">
                   Search by Github Username
                </h2>
            </div>
        );
    }
}

module.exports = Home;
