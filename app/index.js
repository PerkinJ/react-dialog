import React from 'react';
import { render } from 'react-dom';
import App from './components/index.js';
import todoStore from './stores/index.js'

const renderDom = ()=>{
	render(
		<App value={todoStore.getState()} onIncrement={ ()=>{ todoStore.dispatch({ type: 'INCREMENT'})} } 
			onDecrement={ ()=>{ todoStore.dispatch({ type: 'DECREMENT'})} }
		></App>,
		document.getElementById("app")
	)
}

todoStore.subscribe(renderDom);
renderDom();