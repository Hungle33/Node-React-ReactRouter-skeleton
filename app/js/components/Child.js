import React from 'react';

class Child extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<p>{"Child: I'm inside another react component!"}</p>
				<p>{"Some text from my Parent: " + this.props.text}</p>
			</div>
		);
	}
}

export default Child;