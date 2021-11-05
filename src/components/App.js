import styles from './styles.css';
import SearchBar from './SearchBar';
import LoadingIcon from './LoadingIcon';
import TemperatureTable from './TemperatureTable';
import WeatherInfo from './WeatherInfo';
//API CONFIG
import WeatherData from '../apis/WeatherData';
import WeatherForecast from '../apis/WeatherForecast';
//
import React, { useState, useEffect } from 'react';
// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux';
import {
	formSubmitTrue,
	changeBgColor,
	fetchWeatherData,
	clearWeatherData,
	updateSearchTerm,
} from '../actions';

export default () => {
	const dispatch = useDispatch();
	const grayColor = 'rgb(216, 216, 216)';
	const nightColor = 'rgb(13, 13, 43)';
	const dayColor = 'rgb(143, 208, 229)';
	const bgColor = useSelector((state) => state.bgColor);
	const isSearchBarUp = useSelector((state) => state.isSearchBarUp);
	const weatherData = useSelector((state) => state.weatherData);
	const searchTerm = useSelector((state) => state.searchTerm);
	// const [searchTerm, setSearchTerm] = useState('');
	const [forecastData, setForecastData] = useState({});
	let appStyle = { backgroundColor: bgColor, transition: `0.2s` };

	const updateWeatherInfo = async (cityName) => {
		dispatch(fetchWeatherData(cityName));
		if (cityName !== weatherData.name) updateWeatherInfo(weatherData.name);
		const forecast = await WeatherForecast.get('', {
			params: {
				q: cityName,
			},
		});
		setForecastData(forecast.data.forecast);

		// dispatch(updateSearchTerm(weatherData.name)); //Huh
	};

	const updateWeatherState = async (cityName) => {
		try {
			setForecastData({});
			dispatch(clearWeatherData());
			dispatch(changeBgColor(grayColor));
			if (cityName) {
				dispatch(formSubmitTrue());
				updateWeatherInfo(cityName);
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
			<SearchBar
				// searchTerm={searchTerm}
				// setSearchTerm={setSearchTerm}
				updateWeatherState={updateWeatherState}
			/>
			{Object.keys(weatherData).length === 0 ? (
				<LoadingIcon iconOpacity={isSearchBarUp === true ? 1 : 0} />
			) : (
				''
			)}
			{Object.keys(weatherData).length !== 0 ? (
				<WeatherInfo weatherData={weatherData} />
			) : (
				''
			)}
			{Object.keys(forecastData).length !== 0 ? (
				<TemperatureTable forecastData={forecastData} />
			) : (
				''
			)}
		</div>
	);
};
