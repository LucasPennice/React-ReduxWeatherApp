import React, { useState, useEffect } from 'react';

export default (props) => {
	const { c, f, location, weatherIcon, weather } = props.weatherData;
	const [temperatureClass, setTemperatureClass] = useState(
		'temperature appearClass'
	);

	useEffect(() => {
		//Animates transition between temperatures
		setTimeout(() => {
			setTemperatureClass('temperature appearClass');
		}, 10);
		return () => {
			setTemperatureClass('temperature');
		};
	}, [props.isCelsius]);

	return (
		<div className="weatherInfo">
			<div className="weatherInfoContainer">
				<div
					className={temperatureClass}
					onClick={() => props.setIsCelsius(!props.isCelsius)}
				>
					{props.isCelsius === true ? `${c}°` : `${f}°F`}
					<img src={weatherIcon} className="tIcon" />
				</div>
				<div className="weatherState">{weather}</div>
				<div className="location">{location}</div>
			</div>
		</div>
	);
};
