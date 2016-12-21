import React from 'react';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';
import CounterContainer from './containers/CounterContainer';
import App from './components/App';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
  			<IndexRoute component={CounterContainer} />
		</Route>
	</Router>
)

export default routes;