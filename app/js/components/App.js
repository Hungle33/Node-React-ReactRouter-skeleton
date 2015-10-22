import React from 'react';

/* Entry point to the application */
class App extends React.Component {
	render(){
		return (
			<div className="container">
				/* Insert Navbar/Header component */
				{this.props.children}
				/* Insert Footer component */
			</div>
		);
	}
}

export default App;