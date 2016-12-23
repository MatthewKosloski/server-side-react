import React from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/UserList';

// actions

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		increment: () => {
// 			dispatch(increment());
// 		}
// 	}
// }

export default connect(
	mapStateToProps
	// mapDispatchToProps
)(UserList);