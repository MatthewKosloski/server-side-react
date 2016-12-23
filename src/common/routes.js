import React from 'react';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';
import App from './components/App';
import UserListContainer from './containers/UserListContainer';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
  			<IndexRoute component={UserListContainer} />
		</Route>
	</Router>
)

export default routes;