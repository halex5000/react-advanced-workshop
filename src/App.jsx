import * as React from 'react'; // eslint-disable-line unicorn/filename-case
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = React.createContext({toggleColorMode() {}});

function TopToolBar({userName}) {
	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position="fixed" color="inherit">
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
					>
						{userName ? <SentimentSatisfiedAltIcon /> : <LoginIcon />}
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

TopToolBar.propTypes = {
	userName: PropTypes.string,
};

function Toggler() {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	return (
		<AppBar position="fixed" color="inherit" sx={{top: 'auto', bottom: 0}}>
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
	const [userName] = React.useState();
	return (
		<>
			<TopToolBar userName={userName} />
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
