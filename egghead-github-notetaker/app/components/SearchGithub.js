import React from 'react';
// import Router from 'react-router';

class SearchGithub extends React.Component {
	handleSubmit() {
		const username = this.refs.username.getDOMNode().value;
		const router = this.context.router;
		this.refs.username.getDOMNode().value = '';
		router.transitionTo('profile', { username: username });
	}
	render() {
		return (
			<div classsName="col-sm-12">
				<form onSubmit={this.handleSubmit.bind(this)} >
					<div className="form-group col-sm-7">
						<input type="text" ref="username" className="form-control" />
					</div>
					<div className="form-group col-sm-5">
						<button type="submit" className="btn btn-block btn-primary">
							Search Github
						</button>
					</div>
				</form>
			</div>
		);
	}
}

/**
	ES6 doesn't have mixins. ReactRouter utilizies React contexts - pass some piece of functionalities (here a function) to all children.
**/
SearchGithub.contextTypes = {
	// signal React that ReactRouter will pass in in router as context function
	router: React.PropTypes.func.isRequired
};

module.exports = SearchGithub;
