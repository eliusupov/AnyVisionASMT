import React from 'react';
import { Link } from "react-router-dom";

import './NotFound.scss';

const NotFound = (props) => {
	return (
		<div className="not-found">
			<h1>Not Found 404</h1>
			<Link to={'/'}>Homepage</Link>
		</div>
	);
};

export default NotFound;
