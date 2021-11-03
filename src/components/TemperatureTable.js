import React, { useState, useEffect } from 'react';
import Button from './Button';

export default ({ forecastData, isCelsius }) => {
	const [whatDay, setWhatDay] = useState(0);
	const { forecastday } = forecastData;
	const { day, hour, date } = forecastday[whatDay];
	const [currentDay, setCurrentDay] = useState(hour);
	const [minT, setMinT] = useState(day.mintemp_c);
	const [maxT, setMaxT] = useState(day.maxtemp_c);
	let delay = 1;

	useEffect(() => {
		setCurrentDay(hour);
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
			<div className="currentDate">{date.slice(-5)}</div>
		</div>
	);
};
