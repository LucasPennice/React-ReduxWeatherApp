import React from 'react';
import { useSelector } from 'react-redux';

export default ({ iconOpacity }) => {
	const isFormSubmitted = useSelector((state) => state.isFormSubmitted);

	return (
		<div style={{ opacity: `${iconOpacity}`, transition: 'opacity 2s' }}>
			<div className="loadingIcon"></div>
			{isFormSubmitted === false ? (
				<div>Write Something</div>
			) : (
				<div>Searching...</div>
			)}
		</div>
	);
};
