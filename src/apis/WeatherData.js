import axios from 'axios';

const KEY = '8d67f15d3dd84d3ca63184553212810';

export default axios.create({
	baseURL: 'http://api.weatherapi.com/v1/current.json?',
	params: { aqi: 'no', key: KEY },
});
