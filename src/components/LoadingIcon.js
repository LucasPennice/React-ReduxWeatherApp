import React from 'react';

export default ({ iconOpacity, isFormSubmitted, setBgColor }) => {
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
