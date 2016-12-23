import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

export default function(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk));
}