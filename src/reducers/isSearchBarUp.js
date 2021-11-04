const isSearchBarUpReducer = (state = false, action) => {
	if (action.type === 'SEARCHBAR_UP') return (state = true);
	return state;
};

export default isSearchBarUpReducer;
