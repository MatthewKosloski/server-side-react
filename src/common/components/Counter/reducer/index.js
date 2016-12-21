import * as types from '../constants';

export default function(state = 0, action) {
	switch(action.type) {
		case types.INCREMENT: {
			return state += 1;
		}
		default: {
			return state;
		}
	}
}