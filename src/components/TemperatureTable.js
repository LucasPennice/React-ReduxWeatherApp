import React, { useState, useEffect } from 'react';
import Button from './Button';

export default (props) => {
	const [whatDay, setWhatDay] = useState(0);
	const [currentDay, setCurrentDay] = useState(
		props.forecastData.forecastday[whatDay].hour
	);
	let minT = props.forecastData.forecastday[0].day.mintemp_c;
	let maxT = props.forecastData.forecastday[0].day.maxtemp_c;

	useEffect(() => {
		setCurrentDay(props.forecastData.forecastday[whatDay].hour);
		minT = props.forecastData.forecastday[whatDay].day.mintemp_c;
		maxT = props.forecastData.forecastday[whatDay].day.maxtemp_c;
		console.log(whatDay);
	}, [whatDay]);

	const scaleTable = (temp) => {
		if (maxT < 0) {
			//If every T is negative
			return temp + Math.abs(minT) + 65;
		} else if (minT < 0) {
			//If there is a negative T
			return temp + Math.abs(minT) + 65;
		} else {
			const scaleCoeficient = 60 / maxT;
			return temp * scaleCoeficient;
		}
	};
	let delay = 1;

	console.log(props.forecastData);
	const changeDay = (action) => {
		if (action === 'take') {
			whatDay === 0 ? setWhatDay(0) : setWhatDay(whatDay - 1);
		} else if (action === 'add') {
			whatDay === 2 ? setWhatDay(2) : setWhatDay(whatDay + 1);
		}
	};

	return (
		<div className="dunno">
			<div className="TTComponentContainer">
				<Button text="<" task="take" changeDay={changeDay} />
				<div className="forecastDiv">
					<div className="forecastTable">
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
											{props.isCelsius === true
												? `${hour.temp_c}°`
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
				{props.forecastData.forecastday[whatDay].date.slice(-5)}
			</div>
		</div>
	);
};
