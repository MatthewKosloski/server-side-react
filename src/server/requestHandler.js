import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import createStore from '../common/store';
import routes from '../common/routes';
import fetch from 'isomorphic-fetch';

export default function(req, res, next) {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then((response) => response.json())
		.then((response) => {
			let defaultState = { users: response };

			// Create a Redux store
			const store = createStore(defaultState);
			// Get initial state
			const initialState = store.getState();

			match({routes, location: req.url}, (error, redirectLocation, routeContext) => {
				if(error) {
					return next(error);
				} else if(redirectLocation) {
					res.redirect(302, redirectLocation.pathname + redirectLocation.search);
				} else if (routeContext) {
					const html = renderToString(
						<Provider store={store}>
							<RouterContext {...routeContext} />
						</Provider>
					);
					res.status(200).render('index', { title: 'Server-Side React with Redux', html, state: JSON.stringify(initialState) });
				} else {
					res.status(404).send('Not found');
				}
			});
		})
		.catch((err) => {
			return next(err);
		});
}