import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Router, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import 'jquery';
import "@babel/polyfill";

import Main from './src/Components/Main/Main';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Main} />
			<Route exact path="/item" component={Main} />
		</Switch>
	</BrowserRouter>
);

hot(module)(App);

ReactDOM.render(<App/>, document.getElementById('root'));
