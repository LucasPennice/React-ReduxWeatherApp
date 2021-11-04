const bgColorReducer = (state = 'rgb(216, 216, 216)', action) => {
	if (action.type === 'CHANGE_BACKGROUND') return (state = action.payload);
	return state;
};

export default bgColorReducer;
