const isFormSubmittedReducer = (state = false, action) => {
	if (action.type === 'SUBMIT_FORM') return (state = true);
	return state;
};

export default isFormSubmittedReducer;
