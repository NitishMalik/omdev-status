import { GET_TEAMS } from '../actions/types';

const initialState = {
	teams: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TEAMS:
			return {
				...state,
				teams: action.payload
			};
		default:
			return state;
	}
}
