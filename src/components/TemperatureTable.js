import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

export default () => {
	const forecastData = useSelector((state) => state.forecastData);
	const isCelsius = useSelector((state) => state.isCelsius);
	const [whatDay, setWhatDay] = useState(0); //Local State
	const { forecastday } = forecastData;
	const { day, hour, date } = forecastday[whatDay];
	const [currentDay, setCurrentDay] = useState(hour); //Local State
	const [avgT_c, setAvgT_c] = useState(day.avgtemp_c); //Local State
	const [avgT_f, setAvgT_f] = useState(day.avgtemp_f); //Local State
	const [minT, setMinT] = useState(day.mintemp_c); //Local State
	const [minT_f, setMinT_f] = useState(day.mintemp_f); //Local State
	const [maxT, setMaxT] = useState(day.maxtemp_c); //Local State
	const [maxT_f, setMaxT_f] = useState(day.maxtemp_f); //Local State
	let delay = 1;

	useEffect(() => {
		console.log(forecastData);
		setCurrentDay(hour);
		setAvgT_c(day.avgtemp_c);
		setAvgT_f(day.avgtemp_f);
		setMinT(day.mintemp_c);
		setMinT_f(day.mintemp_f);
		setMaxT(day.maxtemp_c);
		setMaxT_f(day.maxtemp_f);
	}, [whatDay]);

	const scaleTable = (temp) => {
		if (maxT < 0 || minT < 0) {
			return temp + Math.abs(minT) + 65;
		} else {
			const scaleCoeficient = 60 / maxT;
			return temp * scaleCoeficient;
		}
	};

	const changeDay = (action) => {
		if (action === 'take') {
			whatDay === 0 ? setWhatDay(0) : setWhatDay(whatDay - 1);
		} else if (action === 'add') {
			whatDay === 2 ? setWhatDay(2) : setWhatDay(whatDay + 1);
		}
	};

	return (
		<div className="TTComponentContainer">
			<div className="TableAndButtonsContainer">
				<Button text="<" task="take" changeDay={changeDay} />
				<div className="TableContainer">
					<div className="ForecastTable">
						{currentDay.map((hour) => {
							delay += 0.05;
							return (
								<div
									className="hourDivs"
									style={{ height: `${scaleTable(hour.temp_c)}%` }}
									key={hour.time_epoch}
								>
									<div
										className="hourBubble"
										style={{ animationDelay: `${delay}s` }}
									>
										<div className="hourBubbleText">
											{isCelsius === true
												? `${hour.temp_c}°C`
												: `${hour.temp_f}°F`}
										</div>
									</div>
									<div className="currentBubbleTime">{hour.time.slice(-5)}</div>
								</div>
							);
						})}
					</div>
				</div>
				<Button text=">" task="add" changeDay={changeDay} />
			</div>
			<div className="currentDate">
				{date.slice(-5)}
				{isCelsius === true
					? ` | Avg: ${avgT_c}°C |`
					: ` | Avg: ${avgT_f}°F |`}{' '}
				{isCelsius === true ? ` Max: ${maxT}°C |` : ` Max: ${maxT_f}°F |`}
				{isCelsius === true ? ` Min: ${minT}°C` : ` Min: ${minT_f}°F`}
			</div>
		</div>
	);
};
