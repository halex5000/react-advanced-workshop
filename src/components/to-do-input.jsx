/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Container, Button, TextField, Box, Stack} from '@mui/material';
import ldLogo from '../assets/ld.svg';

export function Todo() {
	const [description, setDescription] = useState('');

	const onButtonClick = async (event) => {
		event.preventDefault();
		try {
			const body = {description};
			const response = await fetch('http://localhost:5000/api', {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(body),
			});
			// eslint-disable-next-line no-undef
			window.location = '/todo';
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<div>
			<Container>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						paddingTop: '5ch',
					}}
				>
					<img src={ldLogo} />
				</Box>
			</Container>
			<Container maxWidth="lg">
				<h1>Keep track of your daily tasks</h1>
				<Box sx={{display: 'flex', flexWrap: 'wrap'}}>
					<TextField
						id="outlined-basic"
						sx={{m: 1, width: '125ch', alignContent: 'center'}}
						label="What do you need to do today?"
						variant="outlined"
						onChange={(event) => setDescription(event.target.value)}
					/>
				</Box>
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
					<Stack spacing={2} direction="row">
						<Button variant="contained" onClick={onButtonClick}>
							Add To-Do
						</Button>
						<Button variant="outlined" href="/">
							Go Back to Home
						</Button>
					</Stack>
				</Box>
			</Container>
		</div>
	);
}
