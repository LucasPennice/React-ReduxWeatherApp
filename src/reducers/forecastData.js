const forecastDataReducer = (state = {}, action) => {
	if (action.type === 'UPDATE_FORECAST_DATA') return state;
	return state;
};

export default forecastDataReducer;
