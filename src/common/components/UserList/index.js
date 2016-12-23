import React, { Component } from 'react';
import s from './userList.scss';

export default class UserList extends Component {
	render() {
		return(
			<div>
				<h1 className={s.redText}>A user list!!</h1>
				<ul>
					{this.props.users.map((user, i) => {
						return <li key={i}>{user.name}</li>
					})}
				</ul>
			</div>
		);
	}
}