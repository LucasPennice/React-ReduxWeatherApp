import React, { useState, useEffect } from 'react';

export default ({
	isSearchBarUp,
	setIsSearchBarUp,
	searchTerm,
	setSearchTerm,
	getWeatherInfo,
}) => {
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					getWeatherInfo(searchTerm);
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
