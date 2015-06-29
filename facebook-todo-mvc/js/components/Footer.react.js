import React from 'react';

/**
- X items left
- Clear completed
**/

class Footer extends React.Component {
    propTypes: {
    	allTodos: React.PropTypes.object.isRequired
    }
    render() {
        return (
            <div>footer</div>
        );
    }
}

module.exports = Footer;
