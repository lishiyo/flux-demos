import axios from 'axios';
import { GITHUB_API_USER_BASE } from '../config/constants';

// GET /users/:username/repos
function getRepos(username) {
	return axios.get(GITHUB_API_USER_BASE + username + '/repos');
}

// GET /users/:username
function getUserInfo(username) {
	return axios.get(GITHUB_API_USER_BASE + username);
}

const helpers = {
	getGithubInfo: function(username) {
		return axios.all([ getRepos(username), getUserInfo(username) ])
			.then(function(arr) {
				return {
					repos: arr[0].data, // getRepos res
					bio: arr[1].data // getUserInfo res
				}
			});
	}
};

// Export promise objects
module.exports = helpers;
