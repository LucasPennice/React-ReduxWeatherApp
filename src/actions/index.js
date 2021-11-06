import WeatherData from '../apis/WeatherData';
import WeatherForecast from '../apis/WeatherForecast';

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
	const {
		data: { current, location },
	} = await WeatherData.get('', { params: { q: cityName } });

	const { condition, temp_c, temp_f } = current;
	const { region, country, name } = location;
	const weatherObject = {
		weather: condition.text,
		weatherIcon: condition.icon,
		c: temp_c,
		f: temp_f,
		name: name,
		location: `${region}, ${country}`,
	};

	dispatch({ type: 'UPDATE_WEATHER_DATA', payload: weatherObject });
};

export const fetchForecastData = (cityName) => async (dispatch) => {
	const {
		data: { forecast },
	} = await WeatherForecast.get('', { params: { q: cityName } });

	dispatch({ type: 'UPDATE_FORECAST_DATA', payload: forecast });
};

export const clearForecastData = () => {
	return { type: 'CLEAR_FORECAST_DATA' };
};

export const clearWeatherData = () => {
	return { type: 'CLEAR_WEATHER_DATA' };
};

export const updateSearchTerm = (text) => {
	return { type: 'UPDATE_SEARCH_TERM', payload: text };
};
