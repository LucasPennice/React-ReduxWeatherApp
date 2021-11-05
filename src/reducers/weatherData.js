const weatherDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_WEATHER_DATA':
			return (state = action.payload);
		case 'CLEAR_WEATHER_DATA':
			return (state = {});
		default:
			return state;
	}
};

export default weatherDataReducer;
