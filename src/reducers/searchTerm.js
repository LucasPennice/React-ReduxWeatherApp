const searchTermReducer = (state = '', action) => {
	if (action.type === 'UPDATE_SEARCH_TERM') return (state = action.payload);
	return state;
};

export default searchTermReducer;
