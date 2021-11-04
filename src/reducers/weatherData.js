const weatherDataReducer = (state = {}, action) => {
	if (action.type === 'UPDATE_WEATHER_DATA') return (state = action.payload);
	return state;
};

export default weatherDataReducer;
