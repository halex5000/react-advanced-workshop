import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PropTypes from 'prop-types';
import { useFlags } from 'launchdarkly-react-client-sdk';
import LoginPopover from './login-popover';
import {
	Link as RouterLink,
  } from 'react-router-dom';

const drawerWidth = 240;

function ListItemLink(props) {
	const { icon, primary, to } = props;
  
	const renderLink = React.useMemo(
	  () =>
		React.forwardRef(function Link(itemProps, ref) {
		  return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
		}),
	  [to],
	);
  
	return (
	  <li>
		<ListItem button component={renderLink}>
		  {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
		  <ListItemText primary={primary} />
		</ListItem>
	  </li>
	);
  }
  
  ListItemLink.propTypes = {
	icon: PropTypes.element,
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
  };

export default function TopToolBar({userName, setUserName}) {
	const [anchorElement, setAnchorElement] = React.useState();

	const {toolBar, /*I think there's a flag missing here */} = useFlags();

	let todoList = false; //You'll want to remove this once you add the flag. 


	const handleClick = (event) => {
		setAnchorElement(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElement(null);
	};

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	  }));
	  
		const theme = useTheme();
		const [open, setOpen] = React.useState(false);
	  
		const handleDrawerOpen = () => {
		  setOpen(true);
		};
	  
		const handleDrawerClose = () => {
		  setOpen(false);
		};
	  

	return (
		<div>	
		<AppBar position="sticky" color="inherit">
			{toolBar ? <Toolbar color="inherit">
				 <IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={handleDrawerOpen}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}
					color="inherit"
				>
					LaunchDarkly
				</Typography>

				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="login"
					sx={{ mr: 2 }}
					onClick={handleClick}
				>
					{userName ? <SentimentSatisfiedAltIcon /> : <LoginIcon />}
				</IconButton>
				<Typography>{userName}</Typography>
			</Toolbar> : null}
			<LoginPopover
				anchorElement={anchorElement}
				login={setUserName}
				handleClose={handleClose} />
		</AppBar>
		{ todoList ?
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{['To-Do List'].map((text, index) => (
							<ListItemLink to="/todo" primary="To-Do List" icon={<FactCheckIcon />} key={text} disablePadding/>
					))}
				</List>
			</Drawer>
			: null }
			</div>

				);
				}

				TopToolBar.propTypes = {
				userState: PropTypes.string,
				setUserState: PropTypes.func,
				};
