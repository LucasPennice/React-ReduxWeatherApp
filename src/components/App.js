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

export default () => {
	const grayColor = 'rgb(216, 216, 216)';
	const nightColor = 'rgb(13, 13, 43)';
	const dayColor = 'rgb(143, 208, 229)';
	const [isSearchBarUp, setIsSearchBarUp] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [weatherData, setWeatherData] = useState({});
	const [bgColor, setBgColor] = useState('rgb(216, 216, 216)');
	const [isCelsius, setIsCelsius] = useState(true);
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
			setBgColor(grayColor);
			if (cityName) {
				setIsFormSubmitted(true);
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
				? setBgColor(nightColor)
				: setBgColor(dayColor);
		}
	}, [weatherData]);

	return (
		<div className="appBody" style={appStyle}>
			<SearchBar
				isSearchBarUp={isSearchBarUp}
				setIsSearchBarUp={setIsSearchBarUp}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				updateWeatherState={updateWeatherState}
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
