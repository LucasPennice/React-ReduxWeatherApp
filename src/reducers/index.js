import forecastDataReducer from './forecastData';
import isCelsiusReducer from './isCelsius';
import isFormSubmittedReducer from './isFormSubmitted';
import isSearchBarUpReducer from './isSearchBarUp';
import searchTermReducer from './searchTerm';
import weatherDataReducer from './weatherData';
import bgColorReducer from './bgColor';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	forecastData: forecastDataReducer,
	isCelsius: isCelsiusReducer,
	isFormSubmitted: isFormSubmittedReducer,
	isSearchBarUp: isSearchBarUpReducer,
	searchTerm: searchTermReducer,
	weatherData: weatherDataReducer,
	bgColor: bgColorReducer,
});

export default allReducers;
