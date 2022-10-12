import React, {Component} from 'react';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import MyApp from '../App';
import TodoPage from './to-do-page';

export default class Paths extends Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<MyApp />} />
					<Route exact path="todo" element={<TodoPage />} />
				</Routes>
			</BrowserRouter>
		);
	}
}
