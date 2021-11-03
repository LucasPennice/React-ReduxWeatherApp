import React, { useState, useEffect } from 'react';

export default ({ weatherData, isCelsius, setIsCelsius }) => {
	const { c, f, location, weatherIcon, weather } = weatherData;
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
	}, [isCelsius]);

	return (
		<div className="WIcomponentContainer">
			<div className="weatherInfoContainer">
				<div
					className={temperatureClass}
					onClick={() => setIsCelsius(!isCelsius)}
				>
					{isCelsius === true ? `${c}°` : `${f}°F`}
					<img src={weatherIcon} className="weatherIcon" />
				</div>
				<div className="weatherState">{weather}</div>
				<div className="location">{location}</div>
			</div>
		</div>
	);
};
