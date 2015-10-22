import React from 'react';
import {Route} from 'react-router';
import Parent from './components/Parent';
import Title from './components/Title';
import App from './components/App';

/* Can access children of component by using this.props.children. */
export default (
	<Route component={App}>
		<Route path='/title' component={Title}/>
		<Route path='/parent' component={Parent}/>
	</Route>
);