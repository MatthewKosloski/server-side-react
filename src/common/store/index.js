import { createStore } from 'redux';
import rootReducer from '../reducer';

export default function(initialState) {
	return createStore(rootReducer, initialState);
}