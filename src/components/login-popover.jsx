import * as React from 'react';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover} from 'material-ui-popup-state';
import {ButtonGroup} from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';



export default function LoginPopover({anchorElement, handleClose, login}) {

	const [temporaryUserName, setTemporaryUserName] = React.useState();

	const updateUsername = (event) => {
		setTemporaryUserName(event.target.value);
	};


	return (
		<PopupState variant="popover" popupId="login-popover">
			{(popupState) => (
				<div>
					<Popover
						{...bindPopover(popupState)}
						open={anchorElement}
						anchorEl={anchorElement}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					>
						<Typography sx={{p: 2}}>Login to enable user targeting.</Typography>
						<Box
							noValidate
							component="form"
							sx={{
								'& > :not(style)': {m: 1, width: '25ch'},
							}}
							autoComplete="off"
						>
							<TextField
								fullWidth
								id="outlined-basic"
								label="Username"
								variant="outlined"
								onChange={updateUsername}
							/>
						</Box>
						<ButtonGroup sx={{alignContent: 'center'}}>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									login(temporaryUserName)
									console.log('the user name is:', temporaryUserName);
									handleClose();
								}}
							>
								Login
							</Button>
						</ButtonGroup>
					</Popover>
				</div>
			)}
		</PopupState>
	);
}

LoginPopover.propTypes = {
	anchorElement: PropTypes.node,
	handleClose: PropTypes.func,
	login: PropTypes.func,
};
