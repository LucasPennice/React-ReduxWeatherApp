import styles from './styles.css';
import SearchBar from './SearchBar';
import LoadingIcon from './LoadingIcon';
import TemperatureTable from './TemperatureTable';
import WeatherInfo from './WeatherInfo';
//
import React, { useEffect } from 'react';
// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux';
import {
	formSubmitTrue,
	changeBgColor,
	fetchWeatherData,
	fetchForecastData,
	clearWeatherData,
	clearForecastData,
} from '../actions';

export default () => {
	const dispatch = useDispatch();
	const grayColor = 'rgb(216, 216, 216)';
	const nightColor = 'rgb(13, 13, 43)';
	const dayColor = 'rgb(143, 208, 229)';
	const bgColor = useSelector((state) => state.bgColor);
	const isSearchBarUp = useSelector((state) => state.isSearchBarUp);
	const weatherData = useSelector((state) => state.weatherData);
	const forecastData = useSelector((state) => state.forecastData);
	let appStyle = { backgroundColor: bgColor, transition: `0.2s` };

	const updateWeatherState = (cityName) => {
		try {
			dispatch(clearForecastData());
			dispatch(clearWeatherData());
			dispatch(changeBgColor(grayColor));
			if (cityName) {
				dispatch(formSubmitTrue());
				dispatch(fetchWeatherData(cityName));
				dispatch(fetchForecastData(cityName));
			} else {
				alert('Please write something');
			}
		} catch (error) {
			alert(`${error} Please check if your spelling is correct`);
		}
	};

	useEffect(() => {
		if (weatherData.weatherIcon !== undefined) {
			weatherData.weatherIcon.includes('night')
				? dispatch(changeBgColor(nightColor))
				: dispatch(changeBgColor(dayColor));
		}
	}, [weatherData]);

	return (
		<div className="appBody" style={appStyle}>
			<SearchBar updateWeatherState={updateWeatherState} />
			{Object.keys(weatherData).length === 0 ? (
				<LoadingIcon iconOpacity={isSearchBarUp === true ? 1 : 0} />
			) : (
				''
			)}
			{Object.keys(weatherData).length !== 0 ? <WeatherInfo /> : ''}
			{Object.keys(forecastData).length !== 0 ? <TemperatureTable /> : ''}
		</div>
	);
};
