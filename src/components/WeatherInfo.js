import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCelsius } from '../actions';

export default () => {
	const dispatch = useDispatch();
	const isCelsius = useSelector((state) => state.isCelsius);
	const weatherData = useSelector((state) => state.weatherData);
	const { c, f, location, weatherIcon, weather } = weatherData;
	const [temperatureClass, setTemperatureClass] = useState(
		'temperature appearClass'
	); //Local State

	useEffect(() => {
		//Animates transition between temperatures
		setTimeout(() => {
			setTemperatureClass('temperature appearClass');
		}, 10);
		return () => {
			setTemperatureClass('temperature');
		};
	}, [isCelsius]);

	return (
		<div className="WIcomponentContainer">
			<div className="weatherInfoContainer">
				<div
					className={temperatureClass}
					onClick={() => dispatch(toggleCelsius())}
				>
					{isCelsius === true ? `${c}°C` : `${f}°F`}
					<img src={weatherIcon} className="weatherIcon" />
				</div>
				<div className="weatherState">{weather}</div>
				<div className="location">{location}</div>
			</div>
		</div>
	);
};
