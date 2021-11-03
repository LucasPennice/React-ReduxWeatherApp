import React from 'react';

export default ({
	isSearchBarUp,
	setIsSearchBarUp,
	searchTerm,
	setSearchTerm,
	updateWeatherState,
}) => {
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateWeatherState(searchTerm);
				}}
			>
				<input
					placeholder="Enter a city name"
					type="text"
					className={
						isSearchBarUp === false ? 'searchBarInitial' : `searchBarActive `
					}
					onClick={() => setIsSearchBarUp(true)}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</div>
	);
};
