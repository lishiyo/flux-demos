import axios from 'axios';
import { GITHUB_API_USER_BASE } from '../config/constants';

function getRepos(username) {
	return axios.get(GITHUB_API_USER_BASE + username + '/repos');
}
