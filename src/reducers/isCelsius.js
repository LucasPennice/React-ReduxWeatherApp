const isCelsiusReducer = (state = true, action) => {
	if (action.type === 'TOGGLE_IS_CELSIUS') return !state;
	return state;
};

export default isCelsiusReducer;
