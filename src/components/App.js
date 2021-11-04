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
import { formSubmitTrue, changeBgColor } from '../actions';

export default () => {
	const dispatch = useDispatch();
	const grayColor = 'rgb(216, 216, 216)';
	const nightColor = 'rgb(13, 13, 43)';
	const dayColor = 'rgb(143, 208, 229)';
	const bgColor = useSelector((state) => state.bgColor);
	const isSearchBarUp = useSelector((state) => state.isSearchBarUp);
	const [searchTerm, setSearchTerm] = useState('');
	const [weatherData, setWeatherData] = useState({});
	const [forecastData, setForecastData] = useState({});
	let appStyle = { backgroundColor: bgColor, transition: `0.2s` };

	const updateWeatherInfo = async (cityName) => {
		const {
			data: { current, location },
		} = await WeatherData.get('', {
			params: {
				q: cityName,
			},
		});
		const forecast = await WeatherForecast.get('', {
			params: {
				q: cityName,
			},
		});

		const { condition, temp_c, temp_f } = current;
		const { region, country } = location;

		setWeatherData({
			weather: condition.text,
			weatherIcon: condition.icon,
			c: temp_c,
			f: temp_f,
			location: `${region}, ${country}`,
		});

		setForecastData(forecast.data.forecast);
		setSearchTerm(forecast.data.location.name);
	};

	const updateWeatherState = async (cityName) => {
		try {
			setForecastData({});
			setWeatherData({});
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
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
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
