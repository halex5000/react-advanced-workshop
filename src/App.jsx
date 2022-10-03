import * as React from 'react'; // eslint-disable-line unicorn/filename-case
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {
	useTheme,
	ThemeProvider,
	createTheme,
	styled,
} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Masonry from '@mui/lab/Masonry';
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover} from 'material-ui-popup-state';
import {ButtonGroup} from '@mui/material';

const ColorModeContext = React.createContext({toggleColorMode() {}});

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
		title: 'Fern',
	},
	{
		img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
		title: 'Snacks',
	},
	{
		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
		title: 'Mushrooms',
	},
	{
		img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
		title: 'Tower',
	},
	{
		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
		title: 'Sea star',
	},
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
	},
	{
		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
		title: 'Basketball',
	},
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Breakfast',
	},
	{
		img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
		title: 'Tree',
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
	},
	{
		img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
		title: 'Camping Car',
	},
	{
		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
		title: 'Hats',
	},
	{
		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
		title: 'Tomato basil',
	},
	{
		img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
		title: 'Mountain',
	},
	{
		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
		title: 'Bike',
	},
];

const Label = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(0.5),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
}));

function ImageMasonry() {
	return (
		<Box sx={{width: 500, minHeight: 829}}>
			<Masonry columns={3} spacing={2}>
				{itemData.map((item, index) => (
					<div key={item.title}>
						<Label>{index + 1}</Label>
						<img
							src={`${item.img}?w=162&auto=format`}
							srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
							alt={item.title}
							loading="lazy"
							style={{
								borderBottomLeftRadius: 4,
								borderBottomRightRadius: 4,
								display: 'block',
								width: '100%',
							}}
						/>
					</div>
				))}
			</Masonry>
		</Box>
	);
}

function LoginPopover({anchorElement, handleClose, login}) {
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
									console.log('temporary user name:', temporaryUserName);
									login(temporaryUserName);
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

function TopToolBar({userName, setUserName}) {
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

function Toggler() {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	return (
		<AppBar
			position="sticky"
			color="inherit"
			sx={{top: 'auto', bottom: 0, width: '100%'}}
		>
			<Toolbar color="inherit">
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						bgcolor: 'background.default',
						color: 'text.primary',
						borderRadius: 1,
						p: 3,
					}}
				>
					{theme.palette.mode} mode
					<IconButton
						sx={{ml: 1}}
						color="inherit"
						onClick={colorMode.toggleColorMode}
					>
						{theme.palette.mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

function MyApp() {
	const [userName, setUserName] = React.useState();
	return (
		<>
			<TopToolBar userName={userName} setUserName={setUserName} />
			<ImageMasonry />
			<Toggler />
		</>
	);
}

export default function ToggleColorMode() {
	const [mode, setMode] = React.useState('light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode() {
				setMode((previousMode) =>
					previousMode === 'light' ? 'dark' : 'light',
				);
			},
		}),
		[],
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MyApp />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
