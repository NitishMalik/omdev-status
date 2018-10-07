import axios from 'axios';
import { GET_TEAMS } from './types';

export const getTeams = () => (dispatch) => {
	axios
		.get('/api/teams')
		.then((res) => {
			console.log(res);
			dispatch({
				type: GET_TEAMS,
				payload: res.data
			})
		})
		.catch((err) => {
			dispatch({
				type: GET_TEAMS,
				payload: null
			});
		});
};
