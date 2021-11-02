import React, { useState, useEffect } from 'react';
import styles from './styles.css';
import SearchBar from './SearchBar';
import LoadingIcon from './LoadingIcon';
import { render } from '@testing-library/react';
import TemperatureTable from './TemperatureTable';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';

export default () => {
	const baseURL = 'http://api.weatherapi.com/v1/current.json?';
	const forecastURL = 'http://api.weatherapi.com/v1/forecast.json?';
	const [isSearchBarUp, setIsSearchBarUp] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [weatherData, setWeatherData] = useState({});
	const [bgColor, setBgColor] = useState('rgb(216, 216, 216)');
	const [isCelsius, setIsCelsius] = useState(true);
	const [forecastData, setForecastData] = useState({});

	const getWeatherInfo = async (term) => {
		try {
			//Gets current weather data
			setForecastData({});
			setWeatherData({});

			setBgColor('rgb(216, 216, 216)');
			if (term) {
				setIsFormSubmitted(true);
				const { data } = await axios.get(baseURL, {
					params: {
						q: term,
						aqi: 'no',
						key: '8d67f15d3dd84d3ca63184553212810',
					},
				});

				const forecast = await axios.get(forecastURL, {
					params: {
						q: term,
						days: 3,
						alerts: 'no',
						aqi: 'no',
						key: '8d67f15d3dd84d3ca63184553212810',
					},
				});
				setWeatherData({
					weather: data.current.condition.text,
					weatherIcon: data.current.condition.icon,
					c: data.current.temp_c,
					f: data.current.temp_f,
					location: `${data.location.region}, ${data.location.country}`,
				});

				setForecastData(forecast.data.forecast);
				setSearchTerm(forecast.data.location.name);
			} else {
				alert('Write something');
			}
		} catch (error) {
			alert(`${error} Please check if your spelling is correct`);
		}
	};

	useEffect(() => {
		console.log(forecastData);
		if (weatherData.weatherIcon !== undefined) {
			weatherData.weatherIcon.includes('night')
				? setBgColor('rgb(13, 13, 43)')
				: setBgColor('rgb(143, 208, 229)');
		}
	}, [weatherData]);
	let appStyle = { backgroundColor: bgColor, transition: `0.2s` };

	return (
		<div className="appBody" style={appStyle}>
			<SearchBar
				isSearchBarUp={isSearchBarUp}
				setIsSearchBarUp={setIsSearchBarUp}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				getWeatherInfo={getWeatherInfo}
				setIsFormSubmitted={setIsFormSubmitted}
			/>
			{Object.keys(weatherData).length === 0 ? (
				<LoadingIcon
					iconOpacity={isSearchBarUp === true ? 1 : 0}
					searchTerm={searchTerm}
					isFormSubmitted={isFormSubmitted}
					setBgColor={setBgColor}
				/>
			) : (
				''
			)}
			{Object.keys(weatherData).length !== 0 ? (
				<WeatherInfo
					weatherData={weatherData}
					isCelsius={isCelsius}
					setIsCelsius={setIsCelsius}
				/>
			) : (
				''
			)}
			{Object.keys(forecastData).length !== 0 ? (
				<TemperatureTable isCelsius={isCelsius} forecastData={forecastData} />
			) : (
				''
			)}
		</div>
	);
};
