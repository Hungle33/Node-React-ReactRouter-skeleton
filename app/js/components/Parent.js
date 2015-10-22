import React from 'react';
import AddChild from './Child';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {count: 0}; 
		this.tick = this.tick.bind(this); /* Autobinding */
	}
	tick(){
		this.setState({count: this.state.count + 1});
	}
	render(){
		return (
			<div>
				<AddChild text="Example text from Parent."/>
				<p> {this.state.count} </p>
				<button onClick={this.tick}>+</button>
			</div>
		);
	}
}

export default Add;