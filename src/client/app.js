import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '../common/store';
import routes from '../common/routes';

// Have client use the initial state defined by the server
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

const app = (
	<Provider store={store}>
		{routes}
	</Provider>
);

render(app, document.getElementById('app'));