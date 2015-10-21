import React from 'react';
import {Route} from 'react-router';
import Add from './components/Add';
import Home from './components/Home';
import App from './components/App';

export default (
		<Route handler={App}>
			<Route path='/' handler={Home}/>
			<Route path='/add' handler={Add}/>
		</Route>
);