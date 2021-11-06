const forecastDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_FORECAST_DATA':
			return (state = action.payload);
		case 'CLEAR_FORECAST_DATA':
			return (state = {});
		default:
			return state;
	}
};

export default forecastDataReducer;
