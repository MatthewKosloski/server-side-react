import React, { Component } from 'react';

if(process.env.BROWSER) {
	require('./userList.scss');
}

export default class UserList extends Component {
	render() {
		return(
			<div>
				<h1 className="OyxVZn5SOelmj6Mkp0kZu">A user list!</h1>
				<ul>
					{this.props.users.map((user, i) => {
						return <li key={i}>{user.name}</li>
					})}
				</ul>
			</div>
		);
	}
}