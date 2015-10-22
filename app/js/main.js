import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

/* ReactDOM seperation from React is new in 0.14 */
/* History object for proper URL matching */
ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById("app"));