import WeatherData from '../apis/WeatherData';

export const toggleCelsius = () => {
	return { type: 'TOGGLE_IS_CELSIUS' };
};

export const formSubmitTrue = () => {
	return { type: 'SUBMIT_FORM' };
};

export const searchBarUpTrue = () => {
	return { type: 'SEARCHBAR_UP' };
};

export const changeBgColor = (color) => {
	return { type: 'CHANGE_BACKGROUND', payload: color };
};

export const fetchWeatherData = (cityName) => async (dispatch) => {
	let weatherObject = { name: 'placeholder' };
	while (cityName !== weatherObject.name) {
		const {
			data: { current, location },
		} = await WeatherData.get('', { params: { q: cityName } });

		const { condition, temp_c, temp_f } = current;
		const { region, country, name } = location;
		weatherObject = {
			weather: condition.text,
			weatherIcon: condition.icon,
			c: temp_c,
			f: temp_f,
			name: name,
			location: `${region}, ${country}`,
		};
	}

	dispatch({ type: 'UPDATE_WEATHER_DATA', payload: weatherObject });
};

export const clearWeatherData = () => {
	return { type: 'CLEAR_WEATHER_DATA' };
};

export const updateSearchTerm = (text) => {
	return { type: 'UPDATE_SEARCH_TERM', payload: text };
};
