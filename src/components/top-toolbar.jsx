import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PropTypes from 'prop-types';
import LoginPopover from './login-popover';

export default function TopToolBar({userName, setUserName}) {
	const [anchorElement, setAnchorElement] = React.useState();

	const handleClick = (event) => {
		setAnchorElement(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElement(null);
	};

	return (
		<AppBar position="sticky" color="inherit">
			<Toolbar color="inherit">
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{mr: 2}}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					component="div"
					sx={{flexGrow: 1}}
					color="inherit"
				>
					LaunchDarkly
				</Typography>

				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="login"
					sx={{mr: 2}}
					onClick={handleClick}
				>
					{userName ? <SentimentSatisfiedAltIcon /> : <LoginIcon />}
				</IconButton>
				<Typography>{userName}</Typography>
			</Toolbar>
			<LoginPopover
				anchorElement={anchorElement}
				login={setUserName}
				handleClose={handleClose}
			/>
		</AppBar>
	);
}

TopToolBar.propTypes = {
	userName: PropTypes.string,
	setUserName: PropTypes.func,
};
