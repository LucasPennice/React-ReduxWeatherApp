import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formSubmitTrue, searchBarUpTrue, updateSearchTerm } from '../actions';
// export default ({ searchTerm, setSearchTerm, updateWeatherState }) => {

export default ({ updateWeatherState }) => {
	const dispatch = useDispatch();
	const isSearchBarUp = useSelector((state) => state.isSearchBarUp);
	const searchTerm = useSelector((state) => state.searchTerm);

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
					onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
				/>
			</form>
		</div>
	);
};
