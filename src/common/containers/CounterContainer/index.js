import React from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';

// actions
import { increment } from '../../components/Counter/actions';

const mapStateToProps = (state) => {
	return {
		counter: state.counter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => {
			dispatch(increment());
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);