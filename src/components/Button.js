import React from 'react';

export default ({ changeDay, task, text }) => {
	return (
		<button className="tableButtons" onClick={() => changeDay(task)}>
			{text}
		</button>
	);
};
