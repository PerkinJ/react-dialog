import React, { Component } from 'react';

class App extends Component {
	render (){
		return (
			<div>
				<h3>Hello webpack!</h3>
				<p>{this.props.value}</p>
				<button onClick={this.props.onIncrement}>+</button>
				<button onClick={this.props.onDecrement}>-</button>
			</div>
		);
	}
}

export default App;