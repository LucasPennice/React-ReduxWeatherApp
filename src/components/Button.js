import React, { useState, useEffect } from 'react';

export default (props) => {
	return (
		<button className="btn" onClick={() => props.changeDay(props.task)}>
			{props.text}
		</button>
	);
};
