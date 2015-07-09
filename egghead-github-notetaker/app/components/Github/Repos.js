import React from 'react';

class Repos extends React.Component {
    _repoList(repos) {
        return repos.map((repo, index) => {
            return (
                <li className="list-group-item" key={index} >
                    { repo.html_url && <h4><a href={repo.html_url}> {repo.name} </a></h4>}
                    {repo.description && <p> {repo.description} </p>}
                </li>
            );
        });
    }
    render() {
        return (
            <div>
            <h3>{this.props.username}'s Repos </h3>
              <ul className="list-group">
                { this._repoList(this.props.repos) }
              </ul>
            </div>
        );
    }
}

Repos.propTypes = {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
}

export default Repos;
