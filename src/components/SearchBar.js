import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formSubmitTrue, searchBarUpTrue } from '../actions';

export default ({ searchTerm, setSearchTerm, updateWeatherState }) => {
	const dispatch = useDispatch();
	const isSearchBarUp = useSelector((state) => state.isSearchBarUp);

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
					onClick={() => dispatch(searchBarUpTrue())}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</div>
	);
};
