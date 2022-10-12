import React, {useEffect, useState} from 'react';
import {Container, List, Box} from '@mui/material';

export function Tasks() {
	const [todos, setTodos] = useState([]);

	const deleteTodo = async (id) => {
		try {
			const deleteTodo = await fetch(`http://localhost:5000/api/${id}`, {
				method: 'DELETE',
			});

			setTodos(todos.filter((todos) => todos.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};

	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5000/api');
			const jsonData = await response.json();
			setTodos(jsonData);
			console.log(response);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<Container>
			<Box
				sx={{
					m: 1,
					display: 'flex',
					flexWrap: 'wrap',
					paddingTop: '2ch',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h2>On The List</h2>
			</Box>
			<List animated divided inverted relaxed size="huge">
				{todos.map((todo) => (
					<List.Item
						key={todo.todo_id}
						icon="marker"
						content={todo}
						onClick={() => deleteTodo(todo.todo_id)}
					/>
				))}
			</List>
		</Container>
	);
}
