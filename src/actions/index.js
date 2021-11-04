export const toggleCelsius = () => {
	return { type: 'TOGGLE_IS_CELSIUS' };
};

export const formSubmitTrue = () => {
	//
	return { type: 'SUBMIT_FORM' };
};

export const searchBarUpTrue = () => {
	//
	return { type: 'SEARCHBAR_UP' };
};

export const changeBgColor = (color) => {
	return { type: 'CHANGE_BACKGROUND', payload: color };
};
