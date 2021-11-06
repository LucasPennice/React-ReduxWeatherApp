const searchTermReducer = (state = '', action) => {
	switch (action.type) {
		case 'UPDATE_SEARCH_TERM':
			return (state = action.payload);
		case 'UPDATE_WEATHER_DATA':
			return (state = action.payload.name);
		default:
			return state;
	}
};

export default searchTermReducer;
