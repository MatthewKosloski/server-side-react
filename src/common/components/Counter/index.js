import React, { Component } from 'react';

export default function({ counter, increment }) {
	return(
		<div>
			<p>{counter}</p>
			<button onClick={() => increment()}>Increment</button>
		</div>
	);
}